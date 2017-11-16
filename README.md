# automatic-parakeet

予約メール
```
2000-01-01 00:00:00
ご予約フォームより以下のメールを受付けました。
────────────────────────────────────
受付番号：200001019999
入力時間：999 sec
　送信元：http://example.com

[ チェックイン予定日 ] 2017/11/23
[ チェックアウト予定日 ] 2017/11/29
[ 人数 ] 3
[ 氏名 ] 山田 太郎
[ ひらがな ] やまだ たろう
[ email ] example@example.com
────────────────────────────────────

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
署名
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[ POST DATE ] 2000-01-01 00:00:00
[ INPUT TIME ] 999 sec
[ CONVERSION ] 999 conversions
[ PAGE VIEW ] 9 pageviews
[ UNIQUE USERS ] 999 users
[ CONVERSION RATE ] 12.345%
[ REFERRER ] http://example.com
[ SITE IN REFERRER ]
[ HOST NAME ] example.com
[ IP ADDRESS ] 127.0.0.1
[ USER AGENT ] Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36
[ HTTP REFERER ] https://example.com
```

下書き-template-リッチテキストモード
```
%guestname%様

ホテル パピヨン ●●と申します。
このたびはご予約まことにありがとうございます。

チェックイン予定日　　　%checkindate%
チェックアウト予定日　　%checkoutdate%

%guestname%様のお越しをお待ち申し上げます。
ホテル パピヨン ●●
```

下書き-json-プレーンテキストモード
```
{
  "%guestname%": "hash['[ 氏名 ]']",
  "%checkindate%": "var checkInDate=new Date(hash['[ チェックイン予定日 ]']);checkInDate.getFullYear()+'年'+(checkInDate.getMonth()+1)+'月'+checkInDate.getDate()+'日'",
  "%checkoutdate%": "var checkOutDate=new Date(hash['[ チェックアウト予定日 ]']);checkOutDate.getFullYear()+'年'+(checkOutDate.getMonth()+1)+'月'+checkOutDate.getDate()+'日'"
}
```
