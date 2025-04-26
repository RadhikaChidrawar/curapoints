import React, { useState, useEffect, useContext } from 'react';
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from '../../assets/assets.js';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Earings = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  const [filter, setFilter] = useState('all');
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
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

    doc.setFontSize(18);
    doc.setTextColor(40, 53, 147);
    doc.setFont('helvetica', 'bold');
    doc.text('CuraPoint - Doctor Earnings Report', 14, 20);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Filter: ${filter}`, 14, 37);

    const headers = ['#', 'Doctor', 'Fees', 'Commission (10%)'];

    const tableData = filteredAppointments.map((item, index) => [
      index + 1,
      item.docData.name,
      `${currency}${item.amount}`,
      `${currency}${(item.amount * 0.10).toFixed(2)}`
    ]);

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
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 30,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`Doctor_Appointments_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">Appointments Earings</p>
        <div className="flex gap-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            <option value="all">All Appointments</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button 
            onClick={generatePDF}
            disabled={filteredAppointments.length === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 font-medium">
          <p>#</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Commission</p>
        </div>

        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              <p>{currency}{(item.amount * 0.10).toFixed(2)}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-400">No appointments found for the selected filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Earings
