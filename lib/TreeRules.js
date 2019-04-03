"use strict";

require("source-map-support/register");

const Util = require('rk-utils');

const {
  _,
  ensureLeftSlash,
  trimRightSlash
} = Util;

const {
  KeyTree
} = require('@k-suite/algorithms/lib/Tree');

const {
  validateAction,
  composeActions
} = require('./utils/Helpers');

class TreeRules {
  constructor(rules) {
    this._rulesTree = new KeyTree('', rules);
  }

  addRule(route, action) {
    validateAction(action);

    let keys = this._routeToKeys(route);

    let node = this._rulesTree.findByKeyPath(keys);

    if (node) {
      if (!Array.isArray(node.data)) {
        throw new Error("Assertion failed: Array.isArray(node.data)");
      }

      node.data = node.data.concat(_.castArray(action));
    } else {
      this._rulesTree.appendDataByKeyPath(keys, _.castArray(action));
    }
  }

  async run_(route, facts) {
    let chains = this._buildRulesChain(route);

    return chains(facts);
  }

  _buildRulesChain(route) {
    let keys = this._routeToKeys(route);

    let actions = [];
    let rootKey = keys.shift();

    if (rootKey !== this._rulesTree.key) {
      throw new Error(`Node with path "${route}" not found.`);
    }

    if (this._rulesTree.data && this._rulesTree.data.length > 0) {
      actions = actions.concat(this._rulesTree.data);
    }

    let node = this._rulesTree;
    keys.forEach(key => {
      node = node.children[key];

      if (!node) {
        console.log('key path:', keys);
        console.log('current key:', key);
        throw new Error(`Node with path "${route}" not found.`);
      }

      if (node.data && node.data.length > 0) {
        actions = actions.concat(node.data);
      }
    });
    return composeActions(actions);
  }

  _routeToKeys(route) {
    route = ensureLeftSlash(route);
    if (route === '/') return [''];
    route = trimRightSlash(route);
    return route.split('/');
  }

}

module.exports = TreeRules;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmVlUnVsZXMuanMiXSwibmFtZXMiOlsiVXRpbCIsInJlcXVpcmUiLCJfIiwiZW5zdXJlTGVmdFNsYXNoIiwidHJpbVJpZ2h0U2xhc2giLCJLZXlUcmVlIiwidmFsaWRhdGVBY3Rpb24iLCJjb21wb3NlQWN0aW9ucyIsIlRyZWVSdWxlcyIsImNvbnN0cnVjdG9yIiwicnVsZXMiLCJfcnVsZXNUcmVlIiwiYWRkUnVsZSIsInJvdXRlIiwiYWN0aW9uIiwia2V5cyIsIl9yb3V0ZVRvS2V5cyIsIm5vZGUiLCJmaW5kQnlLZXlQYXRoIiwiQXJyYXkiLCJpc0FycmF5IiwiZGF0YSIsImNvbmNhdCIsImNhc3RBcnJheSIsImFwcGVuZERhdGFCeUtleVBhdGgiLCJydW5fIiwiZmFjdHMiLCJjaGFpbnMiLCJfYnVpbGRSdWxlc0NoYWluIiwiYWN0aW9ucyIsInJvb3RLZXkiLCJzaGlmdCIsImtleSIsIkVycm9yIiwibGVuZ3RoIiwiZm9yRWFjaCIsImNoaWxkcmVuIiwiY29uc29sZSIsImxvZyIsInNwbGl0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUFFQSxNQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXBCOztBQUNBLE1BQU07QUFBRUMsRUFBQUEsQ0FBRjtBQUFLQyxFQUFBQSxlQUFMO0FBQXNCQyxFQUFBQTtBQUF0QixJQUF5Q0osSUFBL0M7O0FBQ0EsTUFBTTtBQUFFSyxFQUFBQTtBQUFGLElBQWNKLE9BQU8sQ0FBQyw4QkFBRCxDQUEzQjs7QUFFQSxNQUFNO0FBQUVLLEVBQUFBLGNBQUY7QUFBa0JDLEVBQUFBO0FBQWxCLElBQXFDTixPQUFPLENBQUMsaUJBQUQsQ0FBbEQ7O0FBTUEsTUFBTU8sU0FBTixDQUFnQjtBQUNaQyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNmLFNBQUtDLFVBQUwsR0FBa0IsSUFBSU4sT0FBSixDQUFZLEVBQVosRUFBZ0JLLEtBQWhCLENBQWxCO0FBQ0g7O0FB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QUMwQixLQUFOLENBQVksR0FBWixDQUFQO0FBQ0g7O0FBakVXOztBQW9FaEJDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpDLFNBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IFV0aWwgPSByZXF1aXJlKCdyay11dGlscycpO1xuY29uc3QgeyBfLCBlbnN1cmVMZWZ0U2xhc2gsIHRyaW1SaWdodFNsYXNoIH0gPSBVdGlsO1xuY29uc3QgeyBLZXlUcmVlIH0gPSByZXF1aXJlKCdAay1zdWl0ZS9hbGdvcml0aG1zL2xpYi9UcmVlJyk7XG5cbmNvbnN0IHsgdmFsaWRhdGVBY3Rpb24sIGNvbXBvc2VBY3Rpb25zIH0gPSByZXF1aXJlKCcuL3V0aWxzL0hlbHBlcnMnKTtcblxuLyoqXG4gKiBUcmVlLWJhc2VkIHJ1bGVzIGVuZ2luZS5cbiAqIEBjbGFzc1xuICovXG5jbGFzcyBUcmVlUnVsZXMgeyAgICBcbiAgICBjb25zdHJ1Y3RvcihydWxlcykge1xuICAgICAgICB0aGlzLl9ydWxlc1RyZWUgPSBuZXcgS2V5VHJlZSgnJywgcnVsZXMpO1xuICAgIH1cbiAgICAgICAgXG4gICAgYWRkUnVsZShyb3V0ZSwgYWN0aW9uKSB7XG4gICAgICAgIHZhbGlkYXRlQWN0aW9uKGFjdGlvbik7XG5cbiAgICAgICAgbGV0IGtleXMgPSB0aGlzLl9yb3V0ZVRvS2V5cyhyb3V0ZSk7XG5cbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLl9ydWxlc1RyZWUuZmluZEJ5S2V5UGF0aChrZXlzKTtcbiAgICAgICAgaWYgKG5vZGUpIHtcbiAgICAgICAgICAgIGFzc2VydDogQXJyYXkuaXNBcnJheShub2RlLmRhdGEpO1xuXG4gICAgICAgICAgICBub2RlLmRhdGEgPSBub2RlLmRhdGEuY29uY2F0KF8uY2FzdEFycmF5KGFjdGlvbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcnVsZXNUcmVlLmFwcGVuZERhdGFCeUtleVBhdGgoa2V5cywgXy5jYXN0QXJyYXkoYWN0aW9uKSk7XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgfVxuXG4gICAgYXN5bmMgcnVuXyhyb3V0ZSwgZmFjdHMpIHtcbiAgICAgICAgbGV0IGNoYWlucyA9IHRoaXMuX2J1aWxkUnVsZXNDaGFpbihyb3V0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGNoYWlucyhmYWN0cyk7XG4gICAgfVxuXG4gICAgX2J1aWxkUnVsZXNDaGFpbihyb3V0ZSkge1xuICAgICAgICBsZXQga2V5cyA9IHRoaXMuX3JvdXRlVG9LZXlzKHJvdXRlKTtcbiAgICAgICAgbGV0IGFjdGlvbnMgPSBbXTtcblxuICAgICAgICBsZXQgcm9vdEtleSA9IGtleXMuc2hpZnQoKTtcbiAgICAgICAgaWYgKHJvb3RLZXkgIT09IHRoaXMuX3J1bGVzVHJlZS5rZXkpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTm9kZSB3aXRoIHBhdGggXCIke3JvdXRlfVwiIG5vdCBmb3VuZC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ydWxlc1RyZWUuZGF0YSAmJiB0aGlzLl9ydWxlc1RyZWUuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQodGhpcy5fcnVsZXNUcmVlLmRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuX3J1bGVzVHJlZTsgXG5cbiAgICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZHJlbltrZXldO1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2tleSBwYXRoOicsIGtleXMpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjdXJyZW50IGtleTonLCBrZXkpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vZGUgd2l0aCBwYXRoIFwiJHtyb3V0ZX1cIiBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlLmRhdGEgJiYgbm9kZS5kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zID0gYWN0aW9ucy5jb25jYXQobm9kZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gY29tcG9zZUFjdGlvbnMoYWN0aW9ucyk7XG4gICAgfVxuXG4gICAgX3JvdXRlVG9LZXlzKHJvdXRlKSB7XG4gICAgICAgIHJvdXRlID0gZW5zdXJlTGVmdFNsYXNoKHJvdXRlKTtcblxuICAgICAgICBpZiAocm91dGUgPT09ICcvJykgcmV0dXJuIFsgJycgXTtcblxuICAgICAgICByb3V0ZSA9IHRyaW1SaWdodFNsYXNoKHJvdXRlKTtcblxuICAgICAgICByZXR1cm4gcm91dGUuc3BsaXQoJy8nKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJlZVJ1bGVzOyJdfQ==