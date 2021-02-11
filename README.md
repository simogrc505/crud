# crud

QUERY MYSQL

LIST:
select * from `books` order by `id` ASC limit ?

GET:
select * from `books` where `id` = ?

CREATE:
insert into `books` (`author`, `genre`, `isbn`, `published`, `title`, `created_at`) values (\'Chuck Palahniuk\', \'Narrativa\', \'9788804707950\', \'2019-01-29\', \'Il libro di Talbott\', 2020-02-11)

UPDATE: // esempio update della proprietà published
update `books` set `published` = ? where `id` = ?

DELETE:
delete from `books` where `id` = ?