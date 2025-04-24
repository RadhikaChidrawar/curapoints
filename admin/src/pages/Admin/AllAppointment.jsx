import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from '../../assets/assets.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const AllAppointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const [filter, setFilter] = useState('all');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (aToken) {
      setIsLoading(true);
      getAllAppointments().finally(() => setIsLoading(false));
    }
  }, [aToken]);

  useEffect(() => {
    filterAppointments();
  }, [appointments, filter]);

  const filterAppointments = () => {
    if (filter === 'all') {
      setFilteredAppointments(appointments);
      return;
    }

    const now = new Date();
    let filtered = [];

    switch (filter) {
      case 'week':
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        filtered = appointments.filter(app => {
          const appDate = new Date(app.slotDate);
          return appDate >= oneWeekAgo && appDate <= now;
        });
        break;
      case 'month':
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        filtered = appointments.filter(app => {
          const appDate = new Date(app.slotDate);
          return appDate >= oneMonthAgo && appDate <= now;
        });
        break;
      case 'year':
        const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        filtered = appointments.filter(app => {
          const appDate = new Date(app.slotDate);
          return appDate >= oneYearAgo && appDate <= now;
        });
        break;
      default:
        filtered = appointments;
    }

    setFilteredAppointments(filtered);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(40, 53, 147);
    doc.setFont('helvetica', 'bold');
    doc.text('CuraPoint - Appointments Report', 14, 20);

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(`Report generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Filter: ${filter === 'all' ? 'All Appointments' : `Last ${filter}`}`, 14, 35);

    const tableData = filteredAppointments.map((item, index) => [
      index + 1,
      item.userData.name,
      `${slotDateFormat(item.slotDate)}\n${item.slotTime}`,
      item.docData.name,
      {
        content: `${currency}${item.amount}`,
        styles: { 
          fontStyle: 'bold',
          textColor: [33, 150, 83]
        }
      },
      {
        content: item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Active',
        styles: {
          fontStyle: 'bold',
          textColor: item.cancelled ? [231, 76, 60] :
                    item.isCompleted ? [33, 150, 83] :
                    [41, 128, 185]
        }
      }
    ]);

    const headers = ['#', 'Patient', 'Date & Time', 'Doctor', 'Fees', 'Status'];

    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 45,
      margin: { left: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 4,
        halign: 'center',
        valign: 'middle'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        fontSize: 11
      },
      columnStyles: {
        0: { cellWidth: 'auto', halign: 'center' },
        1: { cellWidth: 'auto', halign: 'left' },
        2: { cellWidth: 'auto', halign: 'center' },
        3: { cellWidth: 'auto', halign: 'left' },
        4: { cellWidth: 'auto', halign: 'right' },
        5: { cellWidth: 'auto', halign: 'center' }
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      didDrawCell: (data) => {
        doc.setDrawColor(220, 220, 220);
        doc.line(
          data.cell.x,
          data.cell.y + data.cell.height,
          data.cell.x + data.cell.width,
          data.cell.y + data.cell.height
        );
      }
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 25,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`CuraPoint_Appointments_${filter}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Appointment Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filter === 'all' ? 'All appointments' : `Appointments from last ${filter}`} • {filteredAppointments.length} records
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          >
            <option value="all">All Appointments</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>

          <button 
            onClick={generatePDF}
            disabled={filteredAppointments.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 py-4 px-6 bg-gray-50 text-gray-600 font-medium text-sm uppercase tracking-wider border-b">
          <div className="col-span-1 text-center">#</div>
          <div className="col-span-3">Patient</div>
          <div className="col-span-2">Date & Time</div>
          <div className="col-span-3">Doctor</div>
          <div className="col-span-1 text-right">Fees</div>
          <div className="col-span-2 text-center">Status</div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          /* Empty State */
          filteredAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-1">No appointments found</h3>
              <p className="text-sm text-gray-500 max-w-md">
                {filter === 'all' 
                  ? "There are no appointments in the system yet." 
                  : `No appointments found for the selected time period (last ${filter}).`}
              </p>
            </div>
          ) : (
            /* Appointment List */
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 py-4 px-6 hover:bg-gray-50 transition-colors">
                  {/* Mobile Header */}
                  <div className="md:hidden flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-500">Appointment #{index + 1}</span>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      item.cancelled ? 'bg-red-100 text-red-800' :
                      item.isCompleted ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Active'}
                    </span>
                  </div>
                  
                  {/* Patient */}
                  <div className="col-span-1 md:col-span-3 flex items-center mb-3 md:mb-0">
                    <img 
                      className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200" 
                      src={item.userData.image || assets.default_user} 
                      alt="patient" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = assets.default_user;
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.userData.name}</p>
                      <p className="text-xs text-gray-500">Patient</p>
                    </div>
                  </div>
                  
                  {/* Date & Time */}
                  <div className="col-span-1 md:col-span-2 mb-3 md:mb-0">
                    <p className="text-sm font-medium text-gray-900">{slotDateFormat(item.slotDate)}</p>
                    <p className="text-xs text-gray-500">{item.slotTime}</p>
                  </div>
                  
                  {/* Doctor */}
                  <div className="col-span-1 md:col-span-3 flex items-center mb-3 md:mb-0">
                    <img 
                      className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200" 
                      src={item.docData.image || assets.default_doctor} 
                      alt="doctor"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = assets.default_doctor;
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.docData.name}</p>
                      <p className="text-xs text-gray-500">Doctor</p>
                    </div>
                  </div>
                  
                  {/* Fees */}
                  <div className="col-span-1 md:col-span-1 mb-3 md:mb-0">
                    <p className="text-sm font-semibold text-green-600 text-right">
                      {currency}{item.amount}
                    </p>
                  </div>
                  
                  {/* Status */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-end">
                    {item.cancelled ? (
                      <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Active
                        </span>
                        <button 
                          onClick={() => cancelAppointment(item._id)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          title="Cancel appointment"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AllAppointment;