import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { API_URL } from '../api/Endpoints'

async function getEmployeeIDs(){
  const response = await fetch(`${API_URL}/generate-tasks-report`)
  const json = await response.json()
  const {data} =  json
  return data
}
export class ReportGenerator{

    static async generateReport(){
        // Create a new jsPDF instance
    const doc = new jsPDF();

    // Define the data for the report
    const fake = [
      [1, 'John Doe', '08:00 AM', '05:00 PM', 'Construction Site A', 'Building A', 'Excavation', 'Excavating for foundation'],
      [2, 'Jane Smith', '09:00 AM', '06:00 PM', 'Construction Site B', 'Bridge C', 'Concrete Pouring', 'Pouring concrete for bridge deck'],
      [3, 'Michael Johnson', '07:30 AM', '04:30 PM', 'Construction Site A', 'Building B', 'Carpentry', 'Framing walls and roof structure'],
      [4, 'Emily Davis', '08:15 AM', '05:15 PM', 'Construction Site C', 'Highway Project X', 'Asphalt Paving', 'Paving road surface'],
      [5, 'Christopher Lee', '07:45 AM', '04:45 PM', 'Construction Site B', 'Bridge C', 'Steel Erection', 'Installing steel beams for bridge'],
      [6, 'Sophia Rodriguez', '08:30 AM', '05:30 PM', 'Construction Site A', 'Building A', 'Electrical Wiring', 'Installing electrical wiring and fixtures'],
      [7, 'William Martinez', '07:00 AM', '04:00 PM', 'Construction Site C', 'Highway Project X', 'Earthwork', 'Excavating and grading for road construction'],
      [8, 'Olivia Taylor', '08:45 AM', '05:45 PM', 'Construction Site B', 'High-rise Tower Y', 'Concrete Formwork', 'Building forms for concrete pouring'],
      [9, 'Daniel Brown', '07:15 AM', '04:15 PM', 'Construction Site A', 'Building B', 'Plumbing', 'Installing plumbing systems'],
      [10, 'Ava Garcia', '08:20 AM', '05:20 PM', 'Construction Site C', 'Highway Project X', 'Bridge Formwork', 'Constructing forms for bridge construction'],
    ]

    ///Skit -charge accordingly to how each employee is using their time
    // They want to be the guys that manage their own stuff - site manager 
    // You can tell acres you can track employees
    //track more what they do in the building
    // the list of tasks- the employee should be doing this and that, update of task in realtime


    // badge in and badge out data and display in a line graph - what are the task and what are we billing at - if you save 20 minutes a day on task - it is accurate and not relying on report
    //Extract report from database
    const data = await getEmployeeIDs()
    fake.push(...data)
  
    const reportData = [
      ['Employee ID', 'FirstName', 'LastName','Site','Badge In','Badge Out','Task','Completed'],
       fake
      // Add more data as needed
    ];

    // Set the report title
    doc.text('Time Clock Report', 14, 15);

    // Generate the table using jspdf-autotable
    doc.autoTable({
      startY: 20,
      head: [reportData[0]],
      body: reportData.slice(1)[0],
    });

    // Save the PDF with the specified file name
    doc.save('time_clock_report.pdf');
    }
}