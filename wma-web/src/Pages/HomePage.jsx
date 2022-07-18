import TopNav from "../Components/TopNav";
import BottomNav from "../Components/BottomNav";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import FullPageLoader from "../Components/FullPageLoader";
import { Col, Container, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";

function HomePage() {
  const { user, loadUser, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, []);

  const options = {
    // responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Last 7 Days Expense",
      },
    },
  };

  const labels = [
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: [5, 6, 8, 15, 6, 6, 9],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      {!user ? (
        <FullPageLoader />
      ) : (
        <>
          <TopNav />
          <div className="page bg-light">
            <Container>
              <Row>
                <Col sm={6} md={4} lg={3}>
                  <div className="home-ballance border rounded shadow-sm p-4 mt-3 bg-white text-center">
                    <strong>Your Ballance</strong>
                    <div>{user.current_wallet.balance}</div>
                  </div>
                </Col>
              </Row>

              <Row>
                <div className="col-6 my-2">
                  <div className="border  home-loan rounded shadow-sm p-4 mt-3 bg-white text-danger text-center">
                    <strong>Loans</strong>
                    <div>{user.current_wallet.loan}</div>
                  </div>
                </div>

                <div className="col-6 my-2">
                  <div className="border home-lend  rounded text-info shadow-sm p-4 mt-3 bg-white text-center">
                    <strong>Lends</strong>
                    <div>{user.current_wallet.lend}</div>
                  </div>
                </div>
              </Row>

              <Row>
                <Col sm={6} md={4} lg={3}>
                  <div className="home-savings border rounded shadow-sm p-4 mt-3 bg-white text-center">
                    <strong>Your Savings</strong>
                    <div>{user.current_wallet.savings}</div>
                  </div>
                </Col>
              </Row>

              <div className="mt-3">
                <Bar options={options} data={data} />
              </div>
            </Container>
          </div>
          <BottomNav />
        </>
      )}
    </>
  );
}

export default HomePage;
