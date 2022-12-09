const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, con) => {
    con.query("SELECT * FROM producto", (err, products) => {
      if (err) {
        res.json(err);
      }
      console.log(products);
      res.render("products", {
        data: products,
      });
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, con) => {
    con.query("INSERT INTO producto set ?", [data], (err, product) => {
      if (err) {
        res.json(err);
      }
      console.log(product);
      res.redirect("/");
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, con) => {
    con.query(
      "SELECT * FROM producto WHERE codigo = ?",
      [id],
      (err, product) => {
        console.log(product);
        res.render("products_edit", {
          data: product[0],
        });
      }
    );
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const productNew = req.body;
  req.getConnection((err, con) => {
    con.query(
      "UPDATE producto set ? WHERE codigo = ?",
      [productNew, id],
      (err, product) => {
        if (err) {
          res.json(err);
        }
        console.log(product);
        res.redirect("/");
      }
    );
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, con) => {
    con.query("DELETE FROM producto WHERE codigo = ?", [id], (err, rows) => {
      res.redirect("/");
    });
  });
};

module.exports = controller;
