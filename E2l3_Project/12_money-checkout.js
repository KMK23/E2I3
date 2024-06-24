// 선택된 요금제와 결제 방법에 따른 추가 입력란 표시
function showPaymentDetails() {
  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  // 모든 추가 입력란을 숨김
  document.getElementById('credit-card-details').style.display = 'none';
  document.getElementById('bank-transfer-details').style.display = 'none';
  document.getElementById('mobile-payment-details').style.display = 'none';

  // 선택된 결제 방법의 입력란 표시
  if (paymentMethod === 'credit-card') {
    document.getElementById('credit-card-details').style.display = 'block';
  } else if (paymentMethod === 'bank-transfer') {
    document.getElementById('bank-transfer-details').style.display = 'block';
  } else if (paymentMethod === 'mobile-payment') {
    document.getElementById('mobile-payment-details').style.display = 'block';
  }

  updateTotalAmount();
}

// 요금제와 연간 결제 옵션에 따른 총 결제 금액 업데이트
function updateTotalAmount() {
  const selectedPlan = document.querySelector('.plan.selected');
  if (!selectedPlan) return;

  const monthlyPrice = parseInt(selectedPlan.getAttribute('data-monthly'));
  const annualPrice = parseInt(selectedPlan.getAttribute('data-annual'));

  const annualPayment = document.getElementById('annual-payment').checked;
  const totalAmount = annualPayment ? annualPrice : monthlyPrice;

  document.getElementById(
    'payment-amount'
  ).innerText = `${totalAmount.toLocaleString()}원`;
}

function openPaymentModal() {
  // 초기화
  document.getElementById('paymentModal').style.display = 'block';
  document.querySelector(
    'input[name="payment-method"][value="credit-card"]'
  ).checked = true;
  document.getElementById('annual-payment').checked = false;
  showPaymentDetails();
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function processPayment() {
  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;
  const annualPayment = document.getElementById('annual-payment').checked;
  const selectedPlan = document.querySelector('.plan.selected');

  if (!selectedPlan) {
    alert('요금제를 선택해주세요.');
    return;
  }

  const planName = selectedPlan.querySelector('.plan-badge').innerText;
  const totalAmount = document.getElementById('payment-amount').innerText;

  let paymentInfo = `선택한 결제 방법: ${paymentMethod}\n선택한 요금제: ${planName}\n총 결제 금액: ${totalAmount}`;
  if (annualPayment) {
    paymentInfo += `\n연간 결제 적용됨`;
  } else {
    paymentInfo += `\n연간 결제 미적용`;
  }

  alert(paymentInfo);
  closePaymentModal();
}

// 요금제 클릭 이벤트
document.querySelectorAll('.plan').forEach((plan) => {
  plan.addEventListener('click', function () {
    // 이전 선택된 요금제 해제
    document.querySelectorAll('.plan').forEach((p) => {
      p.classList.remove('selected');
      // 요금제 헤더에서 selected 클래스 제거
      p.querySelector('.plan-header').classList.remove('selected');
    });

    // 현재 선택된 요금제 표시
    this.classList.add('selected');
    // 현재 선택된 요금제 헤더에 selected 클래스 추가
    this.querySelector('.plan-header').classList.add('selected');

    // 총 결제 금액 업데이트
    updateTotalAmount();
  });
});

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  showPaymentDetails();
});
