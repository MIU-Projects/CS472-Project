
let users = [
  { id: 1, userName: "Srijana", password: "Srijana",total : 0.00 ,shoppingCartList : [] },
  { id: 2, userName: "Sarina", password: "Sarina",total : 0.00 , shoppingCartList : []  },
  { id: 1, userName: "Pasang", password: "Pasang",total : 0.00 ,shoppingCartList : []  },
];
module.exports = class User {

  constructor(id, userName, password) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.shoppingCartList = []; 
  }

  static findByUserNameAndPassword(userName,password) {
    const index = users.findIndex(p => p.userName === userName && p.password === password);
    if (index > -1) {
      const loggedInUser = users[index].userName + Date.now().toString();
       return loggedInUser;
    } else {
        throw new Error('NOT Found');
    }
}
static findByUserName(userName) {
  const index = users.findIndex(p => p.userName === userName);
  if (index > -1) {
     return users[index];
  } else {
      throw new Error('NOT Found');
  }



}

addToShoppingCart(shoppingCartDetails) {
  console.log("this" + this);
  console.log("shoppingCartDetails" + shoppingCartDetails);
} 

};
