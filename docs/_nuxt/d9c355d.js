(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{441:function(t,e,c){"use strict";c.r(e);var n={props:{open:{type:Boolean,default:!1},product:{type:Object,default:function(){}},image:{type:String,default:"/coffee-1.jpg"}},computed:{hasETC:function(){return"etc"in this.product},hasFlavor:function(){return!0===this.hasETC&&"mem"in this.product.etc},hasCaffeine:function(){return!0===this.hasETC&&"cafein"in this.product.etc},caffeine:function(){return this.hasETC&&this.hasCaffeine?"VH"===this.product.etc.cafein?["red darken-1","بسیار بالا"]:"H"===this.product.etc.cafein?["orange darken-1","بالا"]:"M"===this.product.etc.cafein?["yellow darken-2","متوسط"]:["green","کم"]:["",""]}},methods:{closeDialog:function(){this.$emit("close")}}},r=c(77),o=c(94),l=c.n(o),d=c(425),v=c(442),_=c(429),f=c(443),h=c(514),m=c(452),C=c(205),x=c(270),y=c(424),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("v-dialog",{attrs:{fullscreen:"",transition:"dialog-bottom-transition",value:t.open}},[t.product.isVariable?c("v-card",{staticClass:"product-detail-card",attrs:{color:"grey lighten-3"}},[c("div"),t._v(" "),c("v-img",{attrs:{src:t.image,contain:""}},[c("v-btn",{staticClass:"mt-4",attrs:{icon:"",text:"",color:"white",left:"",absolute:"",small:""},on:{click:t.closeDialog}},[c("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),t._l(t.product.variables,(function(e,n){return c("v-card-title",{key:"vars-"+n},[c("div",[c("div",{staticClass:"font-weight-bold text-h4 brown--text"},[t._v("\n          "+t._s(e.name)+"\n        ")]),t._v(" "),c("div",{staticClass:"text-body-2"},[t._v("\n          ارتفاع کشت: "),c("span",[t._v(t._s(e.height))])])]),t._v(" "),c("v-spacer"),t._v(" "),c("div",{staticClass:"text--primary text-h5 font-weight-bold mb-0"},[c("span",{staticClass:"price faNum"},[t._v(t._s(e.price))]),t._v(" "),c("span",{staticClass:"text--secondary text-caption price-unit"},[t._v("هــزار تومان")])]),t._v(" "),c("v-btn",{attrs:{fab:"",icon:"",small:"",color:"cGreen"}},[c("v-icon",[t._v("mdi-plus-circle")])],1)],1)}))],2):c("v-card",{staticClass:"product-detail-card",attrs:{color:"grey lighten-3"}},[c("div"),t._v(" "),c("v-img",{attrs:{src:t.image,contain:""}},[c("v-btn",{staticClass:"mt-4",attrs:{icon:"",text:"",color:"white",left:"",absolute:"",small:""},on:{click:t.closeDialog}},[c("v-icon",[t._v("mdi-close")])],1)],1),t._v(" "),c("v-card-title",{staticClass:"justify-space-between"},[c("div",{staticClass:"font-weight-bold text-h4 brown--text"},[t._v("\n        "+t._s(t.product.name)+"\n      ")]),t._v(" "),c("div",{staticClass:"text--primary text-h5 font-weight-bold mb-0"},[c("span",{staticClass:"price faNum"},[t._v(t._s(t.product.price))]),t._v(" "),c("span",{staticClass:"text--secondary text-caption price-unit"},[t._v("هــزار تومان")])])]),t._v(" "),c("v-card-text",[c("v-divider",{staticClass:"my-4"}),t._v(" "),c("div",{staticClass:"text-body-1"},[t._v("\n        "+t._s(t.product.desc)+"\n      ")]),t._v(" "),c("div",{staticClass:"mt-2 text-body-2"},[t._v("\n        محتویات:\n        "),t._l(t.product.ingredients,(function(e,n){return c("span",{key:"ing-"+n},[t._v("\n          "+t._s(e)+"\n          "),n+1<t.product.ingredients.length?c("span",[t._v("،")]):t._e()])}))],2),t._v(" "),c("v-divider",{staticClass:"my-4"}),t._v(" "),t.hasFlavor?c("div",{staticClass:"mt-4"},[c("span",{staticClass:"text-body-1"},[t._v(" طعم‌یادها: ")]),t._v(" "),t._l(t.product.etc.mem,(function(e,i){return c("v-chip",{key:"flavor-"+i,staticClass:"mx-1",attrs:{color:"brown darken-2",dark:""}},[c("span",{staticClass:"text-body-2"},[t._v(t._s(e))])])}))],2):t._e(),t._v(" "),t.hasCaffeine?c("div",{staticClass:"mt-4"},[c("span",{staticClass:"text-body-1"},[t._v(" میزان کافئین: ")]),t._v(" "),c("v-chip",{attrs:{dark:"",color:t.caffeine[0]}},[t._v(t._s(t.caffeine[1]))])],1):t._e()],1),t._v(" "),c("v-card-actions",[c("v-btn",{attrs:{tile:"",block:"","x-large":"","min-height":"64px",color:"cGreen"}},[c("span",{staticClass:"white--text text-h6 font-weight-bold"},[t._v("افزودن به سبد خرید")])])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardActions:_.a,VCardText:_.b,VCardTitle:_.c,VChip:f.a,VDialog:h.a,VDivider:m.a,VIcon:C.a,VImg:x.a,VSpacer:y.a})}}]);