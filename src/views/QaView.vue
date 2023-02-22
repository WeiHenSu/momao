<template>
  <!-- 麵包屑 -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">首頁</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">常見問題</li>
    </ol>
  </nav>
  <div class="pageTitle fs-4 py-2 mb-4 fw-bolder">
      常見問題
  </div>
  <ul class="qaList ps-0" >
      <li class="qaItem mb-3" :class="{active : liList[index].liActive}" v-for="(item, index) in liList" :key="item.liTitle">
          <div class="upper">
              <a href="#" @click.prevent="qaClick(index)">
                  {{  item.liTitle }}
              </a>
          </div>
          <slide-up-down class="inner" v-model="liList[index].liActive" :duration="300">
              <p>{{  item.liBrief }}</p>
          </slide-up-down>
      </li>
  </ul>
</template>

<script>
import SlideUpDown from 'vue3-slide-up-down'
export default {
  data () {
    return {
      liList: [
        {
          liTitle: '關於退換貨',
          liBrief: `依消費者保護法規定，您享有商品到貨七天猶豫期（含例假日），隨時可解約退貨之權益。但請務必留意，猶豫期並非試用期，您不能將商品用過，然後才說要退喔！
                    若要辦理退換貨，請您來信 momao.pet@gmail.com，請務必於收到商品7天內連絡客服人員並將商品寄回，我們於收到商品後立即為您辦理。
                    客服時間：週一至週五 11:00-18:00
                    客服信箱：momao.pet@gmail.com`,
          liActive: true
        },
        {
          liTitle: '退、換貨流程',
          liBrief: `請以mail方式，提出退換貨申請。（請勿私訊粉專）
                    於申請mail中，註明您的姓名、訂單編號、退換貨品名、以及申請退換貨事由。
                    退換貨事由，原則上有三種，分別是產品有瑕疵、尺寸不合、商品寄錯。
                    接到申請後，我們的退換貨小幫手會於三工作天內與您聯繫後續事宜。
                    我們知道您很急，但在未確認後續事宜前，先別直接就將商品寄回喔！`,
          liActive: false
        },
        {
          liTitle: '尺寸不合換貨處理原則',
          liBrief: `有分尺寸的衣服，尺寸不合可更換一次其他尺寸 (限同款商品)。
                    提出尺寸不合換貨申請前，請特別留意我們所提供的尺寸規格表，避免浪費了一次換貨機會；同時，避免申請換貨浮濫，請留意您需自付來回運費，因此，下單前務必留意規格尺寸。`,
          liActive: false
        },
        {
          liTitle: '退貨須知',
          liBrief: `請於七日內寄回，請保持商品的原始狀態與包裝完整。為避免接觸性傳染疾病、體內外寄生蟲、黴菌皮膚病，
                    商品須在完整、未拆封、未使用狀態且可再販售狀態下才能進行退貨，為了保障其他消費者衛生安全問題，若您的商品已經拆封過，恕無法提供退貨。`,
          liActive: false
        },
        {
          liTitle: '關於退換貨',
          liBrief: `依消費者保護法規定，您享有商品到貨七天猶豫期（含例假日），隨時可解約退貨之權益。但請務必留意，猶豫期並非試用期，您不能將商品用過，然後才說要退喔！
                    若要辦理退換貨，請您來信 momao.pet@gmail.com，請務必於收到商品7天內連絡客服人員並將商品寄回，我們於收到商品後立即為您辦理。
                    客服時間：週一至週五 11:00-18:00
                    客服信箱：momao.pet@gmail.com`,
          liActive: false
        },
        {
          liTitle: '退、換貨流程',
          liBrief: `請以mail方式，提出退換貨申請。（請勿私訊粉專）
                    於申請mail中，註明您的姓名、訂單編號、退換貨品名、以及申請退換貨事由。
                    退換貨事由，原則上有三種，分別是產品有瑕疵、尺寸不合、商品寄錯。
                    接到申請後，我們的退換貨小幫手會於三工作天內與您聯繫後續事宜。
                    我們知道您很急，但在未確認後續事宜前，先別直接就將商品寄回喔！`,
          liActive: false
        },
        {
          liTitle: '尺寸不合換貨處理原則',
          liBrief: `有分尺寸的衣服，尺寸不合可更換一次其他尺寸 (限同款商品)。
                    提出尺寸不合換貨申請前，請特別留意我們所提供的尺寸規格表，避免浪費了一次換貨機會；同時，避免申請換貨浮濫，請留意您需自付來回運費，因此，下單前務必留意規格尺寸。`,
          liActive: false
        },
        {
          liTitle: '退貨須知',
          liBrief: `請於七日內寄回，請保持商品的原始狀態與包裝完整。為避免接觸性傳染疾病、體內外寄生蟲、黴菌皮膚病，
                    商品須在完整、未拆封、未使用狀態且可再販售狀態下才能進行退貨，為了保障其他消費者衛生安全問題，若您的商品已經拆封過，恕無法提供退貨。`,
          liActive: false
        },
        {
          liTitle: '關於退換貨',
          liBrief: `依消費者保護法規定，您享有商品到貨七天猶豫期（含例假日），隨時可解約退貨之權益。但請務必留意，猶豫期並非試用期，您不能將商品用過，然後才說要退喔！
                    若要辦理退換貨，請您來信 momao.pet@gmail.com，請務必於收到商品7天內連絡客服人員並將商品寄回，我們於收到商品後立即為您辦理。
                    客服時間：週一至週五 11:00-18:00
                    客服信箱：momao.pet@gmail.com`,
          liActive: false
        },
        {
          liTitle: '退、換貨流程',
          liBrief: `請以mail方式，提出退換貨申請。（請勿私訊粉專）
                    於申請mail中，註明您的姓名、訂單編號、退換貨品名、以及申請退換貨事由。
                    退換貨事由，原則上有三種，分別是產品有瑕疵、尺寸不合、商品寄錯。
                    接到申請後，我們的退換貨小幫手會於三工作天內與您聯繫後續事宜。
                    我們知道您很急，但在未確認後續事宜前，先別直接就將商品寄回喔！`,
          liActive: false
        }
      ]
    }
  },
  components: {
    SlideUpDown
  },
  methods: {
    qaClick (i) {
      if (!this.liList[i].liActive) {
        this.liList[i].liActive = true
        for (let j = 0; j < this.liList.length; j++) {
          if (j !== i) {
            this.liList[j].liActive = false
          }
        }
      } else {
        this.liList[i].liActive = false
      }
    }
  }
}
</script>

<style>
    ul li {
      list-style-type: none;
    }
    ul li a {
      text-decoration: none;
    }
    .pageTitle {
        color: #23316E;
        border-bottom: 2px solid #23316E;
    }
    .upper {
        border-radius: 8px;
        border: 1px solid #fff;
        overflow: hidden;
    }
    .upper a {
        display: block;
        color: #fff;
        background-color: #ed7120ba;
        font-weight: bolder;
        font-size: 20px;
        padding: 8px 10px;
        position: relative;
    }
    .upper a::after {
        content: '+';
        position: absolute;
        right: 10px;
        top: 5px;
        color: #fff;
        font-size: 24px;
        transition: 0.5s ease all;
    }
    .inner {
        border-radius: 0 0 8px 8px;
        transition: 0.5s ease all;
    }
    .inner p {
        margin-bottom: 10px;
    }
    .inner a {
        color: #0092C8;
    }
    .qaItem.active a::after {
        transform: rotate(45deg);
    }
    .qaItem.active .upper {
        border-radius: 8px 8px 0 0;
    }
    .qaItem.active .inner {
        padding: 10px 15px;
        border: 3px dashed #ed712063;
        border-top: unset;
    }
</style>
