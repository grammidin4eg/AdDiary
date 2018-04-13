cd /d D:\pro\AdDiary\AdDiary
set distr="D:\pro\AdDiary\AdDiary\dist"
set bldir="D:\pro\simbo"
copy D:\pro\AdDiary\dbconf.php %distr%
copy %bldir%\simbo.php %distr%
copy %bldir%\adDiary.php %distr%
copy %bldir%\user.php %distr%
del D:\pro\AdDiary\AdDiary\distr.zip
"C:\Program Files\7-Zip\7z.exe" a distr.zip %distr%\*.* -r