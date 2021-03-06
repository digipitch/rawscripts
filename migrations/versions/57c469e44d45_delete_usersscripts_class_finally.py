"""delete UsersScripts class finally

Revision ID: 57c469e44d45
Revises: 3c87bd302df2
Create Date: 2015-09-04 20:11:21.575680

"""

# revision identifiers, used by Alembic.
revision = '57c469e44d45'
down_revision = '3c87bd302df2'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users_scripts')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users_scripts',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user', sa.VARCHAR(), nullable=True),
    sa.Column('resource_id', sa.VARCHAR(), nullable=True),
    sa.Column('title', sa.VARCHAR(), nullable=True),
    sa.Column('last_updated', sa.DATETIME(), nullable=True),
    sa.Column('permission', sa.VARCHAR(), nullable=True),
    sa.Column('folder', sa.VARCHAR(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###
