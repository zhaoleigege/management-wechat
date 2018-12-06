Component({
  properties: {
    description: {
      type: String,
      value: ''
    },
    reportNumber: {
      type: String,
      value: ''
    },
    classroom: {
      type: String,
      value: ''
    },
    repairNumber: {
      type: String,
      value: ''
    },
    updateTime: {
      type: Date,
      value: ''
    }
  },

  methods: {
    lookup: function () {
      this.triggerEvent('lookup');
    }
  }
})