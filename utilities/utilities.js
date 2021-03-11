const trait = {
  cast: function (src) {
    Object.keys(src).forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        if (Array.isArray(src[prop])) {
          this[prop] = src[prop].map((p) =>
            isNaN(parseFloat(p)) ? p : parseFloat(p)
          );
        } else if (typeof src[prop] === "object" && src[prop] !== null) {
          for (p in src[prop]) {
            this[prop][p] = isNaN(parseFloat(src[prop][p]))
              ? src[prop][p]
              : parseFloat(src[prop][p]);
          }
        } else {
          this[prop] = isNaN(parseFloat(src[prop]))
            ? src[prop]
            : parseFloat(src[prop]);
        }
      }
    });
  },
};

module.exports = trait;
