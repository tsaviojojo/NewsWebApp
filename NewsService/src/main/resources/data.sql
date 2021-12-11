insert into roles (role_title, create_news, update_news, only_update_own_news, delete_news, delete_own_news ,modify_user, add_new_roles) values ('ADMIN',true,true,false,true,false,true,true)
insert into roles (role_title, create_news, update_news, only_update_own_news, delete_news, delete_own_news ,modify_user, add_new_roles) values ('READER',false,false,false,false,false,false,false)
insert into roles (role_title, create_news, update_news, only_update_own_news, delete_news, delete_own_news ,modify_user, add_new_roles) values ('PUBLISHER',true,false,true,false,true,false,false)

insert into news (news_id, news_title, news_content) values (101, 'Covid updates', 'all updates of covid.....')
insert into news (news_id, news_title, news_content) values (102, 'Study updates', 'all updates of Study.....')
insert into news (news_id, news_title, news_content) values (103, 'Weather updates', 'all updates of Weather.....')
insert into news (news_id, news_title, news_content) values (104, 'Sport updates', 'all updates of Sport.....')
insert into news (news_id, news_title, news_content) values (105, 'Economics updates', 'all updates of Economics.....')