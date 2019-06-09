const typeToValue = require('./typeToValue');
const { uppercase } = require('../../api/utils');

module.exports = (schema, stringify = false, keysOnly = false) => {
  const columns = [];
  console.log('SCHEMA', schema)
  const keys = Object.keys(schema.schema);
  keys.forEach((k) => {
    const _type = schema.schema[k].type;
    if (_type) {
      let type = 'string';
      switch (_type) {
        case 'Number':
          type = 'numeric';
          break;
        case 'Boolean':
          type = 'boolean';
          break;
        default:

      }
      console.log('schema.schema[k].unique  ', schema.schema[k].unique);
      columns.push({
        title: uppercase(k),
        field: k,
        type,
        readonly: schema.schema[k].unique ? true : false
      });
    } else {
      Object.keys(schema.schema[k]).forEach((_key) => {
        const _subType = schema.schema[k][_key].type;
        let subType = 'string';
        switch (_subType) {
          case 'Number':
            subType = 'numeric';
            break;
          default:
        }
        columns.push({
          title: `${uppercase(k)} ${uppercase(_key)}`,
          field: `${k}.${_key}`,
          type: subType,
          readonly: schema.schema[k][_key].unique ? true : false
        });
      });
    }
  });
  // [
  //   { title: "Adı", field: "name" },
  //   { title: "Soyadı", field: "surname" },
  //   { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
  //   {
  //     title: "Doğum Yeri",
  //     field: "birthCity",
  //     lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
  //   }
  // ]
  return JSON.stringify(columns);
};
