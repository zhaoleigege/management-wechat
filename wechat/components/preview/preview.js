Component({
  properties: {
    description: {
      type: String,
      value: ''
    },
    phone: {
      type: String,
      value: ''
    },
    classroom: {
      type: String,
      value: ''
    },
    number: {
      type: String,
      value: ''
    },
    time: {
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