function ParkingCard({ data }) {
  return (
    <div style={{
      background:"white",
      padding:"15px",
      margin:"10px 0",
      borderRadius:"10px",
      boxShadow:"0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h3>{data.name}</h3>
      <p>Available: {data.available}/{data.total}</p>
    </div>
  );
}

export default ParkingCard;