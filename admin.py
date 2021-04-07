from flask import Blueprint

admin = Blueprint('admin_module', __name__)


@admin.route('/admin', methods=['GET'])
def root():
    return 'ADMIN PANEL NOT AVAILABLE!'
