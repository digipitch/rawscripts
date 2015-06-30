"""dropping MigrationCheck table

Revision ID: 4f426bc4f0bc
Revises: 4cfa7120d410
Create Date: 2015-05-02 06:30:52.971073

"""

# revision identifiers, used by Alembic.
revision = '4f426bc4f0bc'
down_revision = '4cfa7120d410'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('migration_check')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('migration_check',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('resource_id', sa.VARCHAR(), nullable=True),
    sa.Column('verified_to', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###