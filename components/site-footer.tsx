export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="w">
        © {currentYear}Apex Legal. The information on this website is provided for information purposes only and should not be construed as legal advice on any subject matter. 
        Please seek appropriate legal or professional advice on the particular facts and circumstances at
         issue. Registration and advisory services are subject to applicable laws and regulatory 
         approvals. Advisory on US securities is offered only to eligible clients, 
         in compliance with applicable Indian and foreign laws.
      </div>
    </footer>
  );
}
