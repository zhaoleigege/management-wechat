Component({
  properties: {
    number: {
      type: String,
      value: ''
    },
    day: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: ''
    },
    classroom: {
      type: String,
      value: ''
    },
    reason: {
      type: String,
      value: ''
    },
    createTime: {
      type: String,
      value: ''
    },
    status: {
      type: String,
      value: ''
    },
    apply: {
      type: Boolean,
      value: false
    }
  },

  attached: function () {
    var content = '';
    var color = '';
    switch (this.data.status) {
      case 'applying':
        content = '审批中';
        color = 'orange';
        break;
      case 'refuse':
        content = '拒绝';
        color = 'red';
        break;
      case 'applied':
        content = '同意';
        break;
    }

    this.setData({
      content: content,
      color: color
    });
  },

  methods: {
    acceptSubmit: function () {
      this.triggerEvent('acceptSubmit');
    },
    refuseSubmit: function () {
      this.triggerEvent('refuseSubmit');
    }
  }
})