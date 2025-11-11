## Bonus Section

Express your opinion about how to optimize your website in case that this
website contains intensive data and when more people access, the lower speed
you get?

1. **Database Optimization**

- Add indexing on frequently queried columns (user_id, concert_id, status)
- Apply caching for frequently accessed data such as concert lists and statistics.

2.  **Frontend Optimization**

- Apply lazy loading on components and images

3.  **Scalability**

- Deploy frontend and backend on scalable infrastructure such as Docker + Kubernetes
- Add load balancers and multiple instances of backend services (horizontal scaling)

Express your opinion about how to handle when many users want to reserve the
ticket at the same time? We want to ensure that in the concerts there is no one
that needs to stand up during the show.

1. **Queue System**

- Apply queue system so each reservation request is processed one at a time

2. **Load Testing**

- Utilise tools that simulate concurrent reservations and ensure logic prevents overbooking
