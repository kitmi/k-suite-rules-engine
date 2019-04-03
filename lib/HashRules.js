"use strict";

require("source-map-support/register");

const {
  validateAction,
  composeActions
} = require('./utils/Helpers');

class HashRules {
  constructor() {
    this._mapRules = {};
  }

  addRule(route, action) {
    validateAction(action);
    let actionsBucket = this._mapRules[route];

    if (!actionsBucket) {
      actionsBucket = [];
    }

    if (Array.isArray(action)) {
      actionsBucket = actionsBucket.concat(action);
    } else {
      actionsBucket.push(action);
    }

    this._mapRules[route] = actionsBucket;
  }

  async run_(route, facts) {
    let chains = this._buildActionsChain(route);

    if (chains) {
      return chains(facts);
    }
  }

  _buildActionsChain(route) {
    let actions = this._mapRules[route];
    if (!actions || actions.length === 0) return undefined;
    return composeActions(actions);
  }

}

module.exports = HashRules;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9IYXNoUnVsZXMuanMiXSwibmFtZXMiOlsidmFsaWRhdGVBY3Rpb24iLCJjb21wb3NlQWN0aW9ucyIsInJlcXVpcmUiLCJIYXNoUnVsZXMiLCJjb25zdHJ1Y3RvciIsIl9tYXBSdWxlcyIsImFkZFJ1bGUiLCJyb3V0ZSIsImFjdGlvbiIsImFjdGlvbnNCdWNrZXQiLCJBcnJheSIsImlzQXJyYXkiLCJjb25jYXQiLCJwdXNoIiwicnVuXyIsImZhY3RzIiwiY2hhaW5zIiwiX2J1aWxkQWN0aW9uc0NoYWluIiwiYWN0aW9ucyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FBRUEsTUFBTTtBQUFFQSxFQUFBQSxjQUFGO0FBQWtCQyxFQUFBQTtBQUFsQixJQUFxQ0MsT0FBTyxDQUFDLGlCQUFELENBQWxEOztBQU1BLE1BQU1DLFNBQU4sQ0FBaUI7QUFDYkMsRUFBQUEsV0FBVyxHQUFHO0FBQ1YsU0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNIOztBQUVEQyxFQUFBQSxPQUFPLENBQUNDLEtBQUQsRUFBUUMsTUFBUixFQUFnQjtBQUNuQlIsSUFBQUEsY0FBYyxDQUFDUSxNQUFELENBQWQ7QUFFQSxRQUFJQyxhQUFhLEdBQUcsS0FBS0osU0FBTCxDQUFlRSxLQUFmLENBQXBCOztBQUNBLFFBQUksQ0FBQ0UsYUFBTCxFQUFvQjtBQUNoQkEsTUFBQUEsYUFBYSxHQUFHLEVBQWhCO0FBQ0g7O0FBRUQsUUFBSUMsS0FBSyxDQUFDQyxPQUFOLENBQWNILE1BQWQsQ0FBSixFQUEyQjtBQUN2QkMsTUFBQUEsYUFBYSxHQUFHQSxhQUFhLENBQUNHLE1BQWQsQ0FBcUJKLE1BQXJCLENBQWhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hDLE1BQUFBLGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQkwsTUFBbkI7QUFDSDs7QUFFRCxTQUFLSCxTQUFMLENBQWVFLEtBQWYsSUFBd0JFLGFBQXhCO0FBQ0g7O0FBRUQsUUFBTUssSUFBTixDQUFXUCxLQUFYLEVBQWtCUSxLQUFsQixFQUF5QjtBQUNyQixRQUFJQyxNQUFNLEdBQUcsS0FBS0Msa0JBQUwsQ0FBd0JWLEtBQXhCLENBQWI7O0FBRUEsUUFBSVMsTUFBSixFQUFZO0FBQ1IsYUFBT0EsTUFBTSxDQUFDRCxLQUFELENBQWI7QUFDSDtBQUNKOztBQUVERSxFQUFBQSxrQkFBa0IsQ0FBQ1YsS0FBRCxFQUFRO0FBQ3RCLFFBQUlXLE9BQU8sR0FBRyxLQUFLYixTQUFMLENBQWVFLEtBQWYsQ0FBZDtBQUVBLFFBQUksQ0FBQ1csT0FBRCxJQUFZQSxPQUFPLENBQUNDLE1BQVIsS0FBbUIsQ0FBbkMsRUFBc0MsT0FBT0MsU0FBUDtBQUV0QyxXQUFPbkIsY0FBYyxDQUFDaUIsT0FBRCxDQUFyQjtBQUNIOztBQXBDWTs7QUF1Q2pCRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJuQixTQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB7IHZhbGlkYXRlQWN0aW9uLCBjb21wb3NlQWN0aW9ucyB9ID0gcmVxdWlyZSgnLi91dGlscy9IZWxwZXJzJyk7XG5cbi8qKlxuICogSGFzaC1iYXNlZCBydWxlcyBlbmdpbmUuXG4gKiBAY2xhc3MgXG4gKi9cbmNsYXNzIEhhc2hSdWxlcyAgeyAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWFwUnVsZXMgPSB7fTtcbiAgICB9XG4gICAgICAgIFxuICAgIGFkZFJ1bGUocm91dGUsIGFjdGlvbikge1xuICAgICAgICB2YWxpZGF0ZUFjdGlvbihhY3Rpb24pO1xuXG4gICAgICAgIGxldCBhY3Rpb25zQnVja2V0ID0gdGhpcy5fbWFwUnVsZXNbcm91dGVdO1xuICAgICAgICBpZiAoIWFjdGlvbnNCdWNrZXQpIHtcbiAgICAgICAgICAgIGFjdGlvbnNCdWNrZXQgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYWN0aW9uKSkge1xuICAgICAgICAgICAgYWN0aW9uc0J1Y2tldCA9IGFjdGlvbnNCdWNrZXQuY29uY2F0KGFjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3Rpb25zQnVja2V0LnB1c2goYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21hcFJ1bGVzW3JvdXRlXSA9IGFjdGlvbnNCdWNrZXQ7XG4gICAgfVxuXG4gICAgYXN5bmMgcnVuXyhyb3V0ZSwgZmFjdHMpIHtcbiAgICAgICAgbGV0IGNoYWlucyA9IHRoaXMuX2J1aWxkQWN0aW9uc0NoYWluKHJvdXRlKTtcblxuICAgICAgICBpZiAoY2hhaW5zKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW5zKGZhY3RzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9idWlsZEFjdGlvbnNDaGFpbihyb3V0ZSkge1xuICAgICAgICBsZXQgYWN0aW9ucyA9IHRoaXMuX21hcFJ1bGVzW3JvdXRlXTtcblxuICAgICAgICBpZiAoIWFjdGlvbnMgfHwgYWN0aW9ucy5sZW5ndGggPT09IDApIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBvc2VBY3Rpb25zKGFjdGlvbnMpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoUnVsZXM7Il19