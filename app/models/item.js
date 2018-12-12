import DS from 'ember-data';

export default DS.Model.extend({
partName:DS.attr(),
owner:DS.attr(),
description:DS.attr(),
checkoutto:DS.attr()

});
