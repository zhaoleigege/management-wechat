const URL = require('../../utils/url.js')

Component({
  properties: {
    showPhone: {
      type: Boolean,
      value: true
    },
    showClassroom: {
      type: Boolean,
      value: false
    },
  },

  data: {
    phone: '',
    description: '',
    images: [],
    files: [],
    uploadMore: true
  },
  methods: {
    setPhone: function (e) {
      this.setData({
        phone: e.detail.value
      })
    },
    setClassroom: function (e) {
      this.setData({
        classroom: e.detail.value
      });
    },
    setDescription: function (e) {
      this.setData({
        description: e.detail.value
      })
    },
    stuffSubmit: function () {
      this.triggerEvent('stuffSubmit', {
        classroom: this.data.classroom,
        phone: this.data.phone,
        description: this.data.description,
        images: this.data.images
      });
    },
    chooseImage: function (e) {
      var that = this;
      var upload = true;
      if (this.data.files.length == 2)
        upload = false;

      wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: `${URL.fileUrl}/upload`,
            filePath: tempFilePaths[0],
            name: 'file',
            success: function (res) {
              that.setData({
                images: that.data.images.concat(res.data)
              });
            }
          });
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.setData({
            files: that.data.files.concat(res.tempFilePaths),
            uploadMore: upload
          });
        }
      })
    },
    previewImage: function (e) {
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
      })
    }
  }
})