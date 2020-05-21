export default {
  data () {
    return {
      size: 10,
      loading: true,
      total: 0,
      tableData: [],
      searchForm: {},
      selection: [],
      formItem: {},
      submitType: '',
      modal: false
    }
  },
  methods: {
    // 分页
    handleChangePage (e) {
      const obj = { size: this.size, index: e }
      if (this.searchForm.value) {
        Object.assign(obj, this.searchForm)
      }
      this.getItems(obj)
    },
    // 搜索清除
    handleClear (e) {
      if (e.target.value === '') this.getItems({ size: this.size })
    },
    // 多选
    handleSelectTableItem (selection, row) {
      this.selection = selection
    },
    // 设置默认的搜索key
    setDefaultSearchKey () {
      this.$set(this.searchForm, 'key', this.columns[0].key ? this.columns[0].key : this.columns[1].key)
    },
    // 分页改变事件
    handlePageSizeChange (e) {
      this.size = e
      const searchObj = { size: this.size }
      if (this.searchForm.value) {
        Object.assign(searchObj, this.searchForm)
      }
      this.getItems(searchObj)
    },
    // 搜索
    handleSearch () {
      const obj = {}
      obj[this.searchForm.key] = this.searchForm.value
      this.getItems(obj)
    },
    addItem () {
      this.submitType = 'add'
      this.formItem = {}
      this.modal = !this.modal
    },
    editItem (row, index) {
      this.submitType = 'edit'
      this.formItem = row
      this.modal = !this.modal
    },
    getSuccess (res) {
      this.loading = false
      if (res.data.code === 0) {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      } else {
        this.$Message.warning(res.data.message)
      }
    },
    addSuccess (res) {
      if (res.data.code === 0) {
        this.modal = false
        this.$Message.success('添加成功！')
        this.getItems()
      } else {
        this.$Message.warning(res.data.message)
      }
    },
    editSuccess (res) {
      if (res.data.code === 0) {
        this.modal = false
        this.$Message.success('修改成功！')
      } else {
        this.$Message.warning(res.data.message)
      }
    },
    deleteSuccess (res, index) {
      if (res.data.code === 0) {
        this.$Message.success('删除成功！')
        this.tableData.splice(index, 1)
      } else {
        this.$Message.error(res.data.message)
      }
    },
    deleteBatchSuccess (res) {
      if (res.data.code === 0) {
        this.selection.forEach((item, index) => {
          this.tableData.forEach((sItem, sIndex) => {
            if (sItem.id === item.id) {
              this.$Message.success('删除成功！')
              this.tableData.splice(sIndex, 1)
            }
          })
        })
      }
    }
  },
  mounted () {
    this.setDefaultSearchKey()
  }
}
