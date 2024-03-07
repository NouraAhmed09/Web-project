
var url = require('url');

exports.getData = function (connection, res, req) {
   var q = url.parse(req.url, true).query;
   console.log(q);

   if (q.getType === "product") {
      const query = `SELECT * FROM ${`products_alt`}`;
      connection.query(query, (error, results, fields) => {
         if (error) {
            console.error("errror>>>>", error);
         } else {
            const data = JSON.stringify(results)
            //  console.log("result=>>>",data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
         }
      });
   } else if (q.getType === "pasket") {
      const query = `SELECT * FROM ${`basket`}
      JOIN ${`products_alt`} ON products_alt.ID = basket.ID;`;
      connection.query(query, (error, results, fields) => {
         if (error) {
            console.error("errror>>>>", error);
         } else {
            const data = JSON.stringify(results)
            //  console.log("result=>>>",data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
         }
      });
   } else {
      let id = parseInt(q.productId);
      console.log("id>>>", q.productId);

      const query = `INSERT INTO basket (ID) VALUES ('${id}');`;

      console.log(query);

      connection.query(query, (error, results, fields) => {
         if (error) {
            console.error("errror>>>>", error);
            res.writeHead(205, { 'Content-Type': 'text/plain' });
            res.end("error in Pasket");
         } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("add product to Pasket Sucsessfuly");
         }
      });
   }
   let data;

   console.log(q);
   return data;
}