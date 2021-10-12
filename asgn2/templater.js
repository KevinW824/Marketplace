/**
 * CSE183 Assignment 2
 */
class Templater {
  /**
   * Create a templater
   * @param {string} template - A {{ }} tagged string
   */
  constructor(template) {
    this.template = template;
  }

  /**
   * Apply map to template to generate string
   * @param {object} map Object with propeties matching tags in template
   * @param {boolean} strict Throw an Error if any tags in template are
   *     not found in map
   * @return {string} template with all tags replaced
   * @throws An Error if strict is set and any tags in template are not
   *     found in map
   */
  apply(map, strict) {
    const regex = /{{[^{}}]*}}/g;
    let str = this.template;
    let m;

    while ((m = regex.exec(this.template)) != null) { // find next match
      m.forEach((match) => { // extract match
        // get word between curly braces
        const matchKey = match.substring(2, match.length - 2);
        if (matchKey in map) {
          str = str.replace(match, map[matchKey]);
        } else if (strict) {
          throw new UserException(matchKey + 'is not found');
        } else {
          str = str.replace(match, '');
          str = str.replace('  ', ' '); // get rid of double spaces
        }
      });
    }
    return str;
  }
}

// To satisfy linter rules
new Templater(undefined).apply();

module.exports = Templater;
