# 老爸的私房錢
此專案使用Node.js + Express + Express-handlebars + MongoDB 打造的記帳功能
# 網站功能
+ 使用者可以在首頁一次瀏覽全部支出
+ 使用者可以新增支出項目
+ 使用者可以編輯所有支出項目(一次只能編輯一筆)
+ 使用者可以刪除任何一筆支出項目(一次只能刪除一筆)
+ 使用者可以看到全部支出金額
+ 使用者可以篩選顯示的支出(update 2020/8/27)
+ 使用者可以查詢到前五年的支出(update 2020/8/27)
# 專案畫面
![](https://upload.cc/i1/2020/08/27/DnYpW4.png)
![](https://upload.cc/i1/2020/08/27/2st4Qf.png)
# 安裝方式
1.打開 terminal 將專案 clone 到本地電腦
```
git clone https://github.com/taylorchen78/expense-tracker.git
```
2.進入專案資料夾
```
cd expense-tracker
```
3.安裝npm
```
npm install
```
4.安裝nodemon
```
npm install nodemon
```
5.匯入種子資料
```
npm run seed
```
6.啟動程式
```
npm run start
或
npm run dev
```
6.成功執行
```
在 terminal 可以看到 Express is listen on port 3000.
```
7.開啟瀏覽器
```
網址列輸入localhost:3000
```
# 測試帳號
| 帳號 | 密碼 |
| ------:| -----------:|
| father@example.com | 12345678 |
# 開發環境
+ Node.js: v10.15.0
+ Express: v4.17.1
+ Express-Handlebars: v5.1.0
+ mongoose: v5.9.27
# 專案開發人員
[LIN-CHANG-YI](https://github.com/LIN-CHANG-YI)
