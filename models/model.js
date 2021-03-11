class model {
    constructor(trait = null) {
      trait && Object.assign(this, trait);
    }
  }
  
  module.exports = model;
  