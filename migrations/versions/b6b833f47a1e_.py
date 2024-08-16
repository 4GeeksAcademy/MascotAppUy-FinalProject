"""empty message

Revision ID: b6b833f47a1e
Revises: 148781dd5e43
Create Date: 2024-08-15 20:55:46.699349

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6b833f47a1e'
down_revision = '148781dd5e43'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mascota', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url_image', sa.String(length=250), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('mascota', schema=None) as batch_op:
        batch_op.drop_column('url_image')

    # ### end Alembic commands ###