insert into roles (role_title, create_news, update_news, only_update_own_news, delete_news, delete_own_news ,modify_user, add_new_roles) values ('ADMIN',true,true,false,true,false,true,true)
insert into roles (role_title, create_news, update_news, only_update_own_news, delete_news, delete_own_news ,modify_user, add_new_roles) values ('READER',false,false,false,false,false,false,false)
insert into roles (role_title, create_news, update_news, only_update_own_news, delete_news, delete_own_news ,modify_user, add_new_roles) values ('PUBLISHER',true,false,true,false,false,false,false)

insert into user (user_id, user_name, user_password, user_role, role_title) values (1, 'savio', '1234', 'ADMIN', (select role_title from roles where role_title='ADMIN'))
insert into user (user_id, user_name, user_password, user_role, role_title) values (2, 'pub', '1234', 'PUBLISHER', (select role_title from roles where role_title='PUBLISHER'))
insert into user (user_id, user_name, user_password, user_role, role_title) values (3, 'reader', '1234', 'READER', (select role_title from roles where role_title='READER'))


insert into news (news_id, news_title, news_content) values (101, 'Covid updates', 'All updates of covid..')
insert into news (news_id, news_title, news_content) values (102, 'Study updates', 'All updates of Study..')
insert into news (news_id, news_title, news_content) values (103, 'Weather updates', 'All updates of Weather..')
insert into news (news_id, news_title, news_content) values (104, 'Sport updates', 'All updates of Sport..')
insert into news (news_id, news_title, news_content) values (105, 'Economics updates', 'All updates of Economics..')
