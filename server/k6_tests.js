import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    {duration: '1s', target: 1000},
  ]
}

export default () => {
  let reviews = http.get('http://localhost:3000/reviews/');
  // let specificReview = http.get('http://localhost:3000/reviews/?product_id=66642');
  // let meta = http.get('http://localhost:3000/reviews/meta?product_id=66642');
  check(reviews, { 'status was 200': r => r.status === 200 });
  sleep(1);
}