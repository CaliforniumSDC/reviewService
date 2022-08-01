import http from 'k6/http';
import { sleep, check } from 'k6';

// k6 run script.js

// virtual users and duration
export const options = {
  vus: 50,
  duration: '15s',
};

export default function () {
  const res = http.get('http://localhost:3000/meta/5');
  // sleep(1);
  // check to see what kind of server response were getting
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
    'transaction time < 100ms': (r) => r.timings.duration < 100
});
}