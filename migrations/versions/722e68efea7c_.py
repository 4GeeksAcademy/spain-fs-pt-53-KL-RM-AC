"""empty message

<<<<<<<< HEAD:migrations/versions/722e68efea7c_.py
Revision ID: 722e68efea7c
Revises: 
Create Date: 2024-03-23 11:42:02.340428

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '722e68efea7c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('user_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorite_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Enum('Yes', 'No', name='petchoice'), nullable=False),
    sa.Column('gender', sa.Enum('Male', 'Female', name='genderchoices'), nullable=False),
    sa.Column('budget', sa.Integer(), nullable=False),
    sa.Column('find_roomie', sa.Enum('Apartment', 'NoApartment', name='findroomiechoice'), nullable=False),
    sa.Column('text_box', sa.Text(), nullable=False),
    sa.Column('profile_img', sa.String(length=1000), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_properties')
    op.drop_table('favorite_profile')
    op.drop_table('user')
    # ### end Alembic commands ###
