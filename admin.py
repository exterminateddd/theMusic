from flask import Blueprint, render_template

admin = Blueprint('admin_module', __name__)


@admin.route('/admin', methods=['GET'])
def root():
    return render_template('admin_home.html')
