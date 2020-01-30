const db = require('../data/dbConfig');


module.exports = {
    add,
    find,
    findBy,
    findById,
  };


  function find() {
      return db('user').select('id', 'username', 'password');
  }

function findBy(filter) {
    return db('user').where(filter);
}

function findById(id){
    return db('user')
    .where({id})
    .first();
}

function add(user) {
    return db('user')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }

