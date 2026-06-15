import sqlite3
import os
import csv
import io
from datetime import datetime
from functools import wraps
from flask import Flask, request, jsonify, g, render_template, redirect, url_for, session, Response
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'expo-masr-2026-secret-key-change-in-production')
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'bookings.db')

# Admin credentials (change in production via env vars)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(exception=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            companyName TEXT NOT NULL,
            contactPerson TEXT NOT NULL,
            phone TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            email TEXT DEFAULT '',
            city TEXT DEFAULT '',
            sector TEXT NOT NULL,
            selectedPackage TEXT NOT NULL,
            price REAL DEFAULT 0,
            message TEXT DEFAULT '',
            date TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated


@app.teardown_appcontext
def teardown(exception=None):
    close_db(exception)


# ─── API Routes ────────────────────────────────────────────────

@app.route('/')
def home():
    """الصفحة الرئيسية - إعادة توجيه إلى لوحة التحكم"""
    return redirect(url_for('admin_login'))


@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'error': 'بيانات غير صالحة'}), 400

    required = ['id', 'companyName', 'contactPerson', 'phone', 'whatsapp', 'sector', 'selectedPackage']
    for field in required:
        if not data.get(field):
            return jsonify({'success': False, 'error': f'الحقل {field} مطلوب'}), 400

    try:
        db = get_db()
        db.execute('''
            INSERT INTO bookings (id, companyName, contactPerson, phone, whatsapp, email, city, sector, selectedPackage, price, message, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['id'],
            data['companyName'],
            data['contactPerson'],
            data['phone'],
            data['whatsapp'],
            data.get('email', ''),
            data.get('city', ''),
            data['sector'],
            data['selectedPackage'],
            data.get('price', 0),
            data.get('message', ''),
            data.get('date', datetime.now().isoformat()),
        ))
        db.commit()
        return jsonify({'success': True, 'message': 'تم حفظ الحجز بنجاح', 'id': data['id']}), 201
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'error': 'كود الحجز موجود مسبقاً'}), 409
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    try:
        db = get_db()
        rows = db.execute('SELECT * FROM bookings ORDER BY created_at DESC').fetchall()
        bookings = [dict(row) for row in rows]
        return jsonify({'success': True, 'data': bookings, 'count': len(bookings)})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/bookings/stats', methods=['GET'])
def get_stats():
    try:
        db = get_db()
        total = db.execute('SELECT COUNT(*) as count FROM bookings').fetchone()['count']
        return jsonify({'success': True, 'total': total})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# ─── Admin Dashboard Routes ────────────────────────────────────

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if session.get('admin_logged_in'):
        return redirect(url_for('admin_dashboard'))

    error = None
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            error = 'اسم المستخدم أو كلمة المرور غير صحيحة'
    return render_template('admin/login.html', error=error)


@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin_login'))


@app.route('/admin/')
@login_required
def admin_dashboard():
    db = get_db()
    search = request.args.get('search', '').strip()
    sector_filter = request.args.get('sector', '').strip()

    query = 'SELECT * FROM bookings WHERE 1=1'
    params = []

    if search:
        query += ' AND (companyName LIKE ? OR contactPerson LIKE ? OR phone LIKE ? OR id LIKE ?)'
        like = f'%{search}%'
        params.extend([like, like, like, like])

    if sector_filter:
        query += ' AND sector = ?'
        params.append(sector_filter)

    query += ' ORDER BY created_at DESC'
    rows = db.execute(query, params).fetchall()
    bookings = [dict(row) for row in rows]

    # Stats
    total = db.execute('SELECT COUNT(*) as count FROM bookings').fetchone()['count']
    last = db.execute('SELECT companyName FROM bookings ORDER BY created_at DESC LIMIT 1').fetchone()
    premium_count = db.execute("SELECT COUNT(*) as count FROM bookings WHERE selectedPackage LIKE '%Premium%' OR selectedPackage LIKE '%Sponsor%' OR price >= 12000").fetchone()['count']

    # Unique sectors for filter dropdown
    sectors = [r['sector'] for r in db.execute('SELECT DISTINCT sector FROM bookings ORDER BY sector').fetchall()]

    return render_template('admin/dashboard.html',
        bookings=bookings,
        search=search,
        sector=sector_filter,
        sectors=sectors,
        stats={'total': total, 'last_booking': last['companyName'] if last else None, 'premium_count': premium_count}
    )


@app.route('/admin/export')
@login_required
def admin_export():
    db = get_db()
    rows = db.execute('SELECT * FROM bookings ORDER BY created_at DESC').fetchall()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['كود الحجز', 'اسم الشركة', 'المسؤول', 'الهاتف', 'واتساب', 'البريد', 'المدينة', 'القطاع', 'الباقة', 'السعر', 'الرسالة', 'تاريخ الحجز'])
    for r in rows:
        writer.writerow([r['id'], r['companyName'], r['contactPerson'], r['phone'], r['whatsapp'], r['email'], r['city'], r['sector'], r['selectedPackage'], r['price'], r['message'], r['date']])

    csv_bytes = output.getvalue().encode('utf-8-sig')
    return Response(
        csv_bytes,
        mimetype='text/csv; charset=utf-8',
        headers={'Content-Disposition': f'attachment; filename=expo_masr_bookings_{datetime.now().strftime("%Y%m%d")}.csv'}
    )


if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
