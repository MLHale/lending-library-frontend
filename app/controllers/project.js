import Projectarray from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  objlist: Projectarray([{name:'Project Alpha', qty:'2' ,link:'test.jpg'}, {name:'Project Charlie', qty:'7' , link:'test.jpg'}]),
});
