/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T00:29:43-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: navigation.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:59:29-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Service from '@ember/service';
import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';
import config from '../config/environment';

export default Service.extend({
  /**
    Set of items to be displayed in the nav menu
  **/
  menuitems: ArrayProxy.create({ content: A([
      {route: 'index', icon: 'home', title: 'home', type: 'internal'},
      {route: 'awards', icon:'view_list', title: "awards", type: 'internal'}
  ]) }),
  /**
    Set of items to be displayed in the nav menu, if the user is an admin
  **/
  adminmenuitems: ArrayProxy.create({ content: A([
      {route: config.serverName+'/admin/api/award/add/', icon:'add', title: "add a new award", type: 'external'},
      {route: config.serverName+'/admin/api/award/', icon:'edit', title: "edit an award", type: 'external'}
  ]) }),
});
