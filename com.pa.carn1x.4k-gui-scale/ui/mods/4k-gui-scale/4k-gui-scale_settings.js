(function() {
  api.settings.definitions.ui.settings.ui_scale.options.max = 3.5;

  var _group = 'ui';
  var _key = 'ui_scale';

  api.settings['resetUiScale'] = function () {
    var reset_to = 0.75;  // Reset to a small value to ensure UI visibility.
    api.settings.set(_group, _key, reset_to);
    // TODO: Is both apply and save needed?
    api.settings.apply();
    api.settings.save();
    // TODO: Is there a more concise method?
    model.settingGroups.notifySubscribers();
    ui_scale_subscribe();
    disableResetUiScale();
  };

  var ui_scale_subscribe = function() {
    var ui_scale_value_initial = api.settings.observableMap[_group][_key]();
    var ui_scale_value = ko.computed(function() { return api.settings.observableMap[_group][_key]() });
    ui_scale_value.subscribe(function(new_value) {
      // TODO: Fix reset scale button enabled by default, seems to be enabled by something else?
      if (ui_scale_value_initial != new_value) {
        ui_scale_value_initial = new_value;
        $ui_scale_reset.removeClass('disabled');
      }
    });
  };

  var $ui_scale_slider = $('div.option-list.ui').find('div.option[data-bind*="ui_scale"]');

  // TODO: Use a better style.
  // TODO: Use a template?
  var $ui_scale_reset = $('<div id="command" class="btn_neg disabled"' +
  'data-bind="click: function(){ api.settings.resetUiScale(); }, ' +
    'click_sound: \'default\', rollover_sound: \'default\', css: { disabled: isDefault }">' +
    '<div class="btn_label small"><loc>Reset Scale</loc></div></div>');
  $ui_scale_reset.insertBefore($ui_scale_slider);

  var disableResetUiScale = function() {
    // TODO: Make disabled actually do something.
    $ui_scale_reset.addClass('disabled');
  };

}());

