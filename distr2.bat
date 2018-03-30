cd /d D:\pro\AdDiary\AdDiary
ng build --prod
set distr="D:\pro\AdDiary\AdDiary\dist"
set bldir="D:\pro\simbo"
copy dbconf.php %distr%
copy %bldir%\simbo.php %distr%
copy %bldir%\adDiary.php %distr%
copy %bldir%\user.php %distr%