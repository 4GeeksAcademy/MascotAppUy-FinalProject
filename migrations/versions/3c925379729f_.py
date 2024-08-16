"""empty message

Revision ID: 3c925379729f
Revises: 750715863bf6
Create Date: 2024-08-15 19:50:11.079412

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3c925379729f'
down_revision = '750715863bf6'
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