import {Component} from "@angular/core";
import {FlatNode, TreeNode} from "@models/ui/TreeNode";
import { DASHBOARD_ROUTES} from "@dashboard/dashboard.route.declarations";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {AuthService} from "@app/modules/auth/shared/_services/auth.service";

@Component({
  selector: 'app-tree-flat-overview',
  templateUrl: 'flat-routes-tree.html',
  styleUrls: ['flat-routes_menu.scss'],
})
export class FlatRoutesTree {
  routeSearch: string = '';
  toggle: boolean = false;
  private _transformer = (node: TreeNode, level: number) => {
    // const isInRole = node.authorizedRoles ? node.authorizedRoles.some(value => this.authService.currentUserValue.roles.includes(value)) : false;
    return {
      expandable: (!!node.children && node.children.length > 0),
      name: node.name,
      level: level,
      path: node.path,
      icon: node.icon ?? '',
      visible: false
    };
  }
  constructor(private authService: AuthService) {this.dataSource.data = DASHBOARD_ROUTES;}
  treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;

}
