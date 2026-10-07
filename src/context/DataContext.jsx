import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_INITIAL_PLOTS } from '../data/initialData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('onlyplots_listings_v3');
      return saved ? JSON.parse(saved) : ALL_INITIAL_PLOTS;
    } catch {
      return ALL_INITIAL_PLOTS;
    }
  });

  const [shortlists, setShortlists] = useState(() => {
    try {
      const saved = localStorage.getItem('onlyplots_shortlists');
      return saved ? JSON.parse(saved) : ['pavani-royale', 'ashoka-meadows'];
    } catch {
      return ['pavani-royale', 'ashoka-meadows'];
    }
  });

  const [siteVisits, setSiteVisits] = useState(() => {
    try {
      const saved = localStorage.getItem('onlyplots_visits');
      return saved ? JSON.parse(saved) : [
        {
          id: "visit-1",
          plot_id: "pavani-royale",
          plot_name: "Pavani Royale",
          location: "Shadnagar, Kothur",
          visit_date: "2025-10-12",
          visit_time: "10:30 AM",
          people_count: 2,
          transport: "own_car",
          status: "Scheduled",
          visitor_name: "Rahul Sharma",
          visitor_phone: "+91 98765 12345"
        }
      ];
    } catch {
      return [];
    }
  });

  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('onlyplots_leads');
      return saved ? JSON.parse(saved) : [
        {
          id: "lead-1",
          buyer_name: "Rahul Sharma",
          buyer_phone: "+91 98765 12345",
          buyer_email: "rahul@example.com",
          plot_id: "pavani-royale",
          plot_name: "Pavani Royale",
          requirement: "Price Quote — 200 Sq Yd East Facing",
          status: "New",
          created: "2025-09-28"
        },
        {
          id: "lead-2",
          buyer_name: "Kavitha Reddy",
          buyer_phone: "+91 98490 88210",
          buyer_email: "kavitha.r@gmail.com",
          plot_id: "ashoka-meadows",
          plot_name: "Ashoka Meadows",
          requirement: "Site Visit & Layout Master Plan",
          status: "Contacted",
          created: "2025-09-30"
        }
      ];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('onlyplots_messages');
      return saved ? JSON.parse(saved) : [
        {
          id: "msg-1",
          name: "Suresh Babu",
          email: "suresh@gmail.com",
          phone: "+91 98888 77777",
          subject: "Looking for commercial plot near Airport Corridor",
          message: "Please connect me with verified sellers in Tukkuguda / Shamshabad zone.",
          status: "New",
          created: "2025-10-01"
        }
      ];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('onlyplots_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('onlyplots_shortlists', JSON.stringify(shortlists));
  }, [shortlists]);

  useEffect(() => {
    localStorage.setItem('onlyplots_visits', JSON.stringify(siteVisits));
  }, [siteVisits]);

  useEffect(() => {
    localStorage.setItem('onlyplots_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('onlyplots_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  const toggleShortlist = (plotId) => {
    setShortlists(prev => {
      const exists = prev.includes(plotId);
      if (exists) {
        return prev.filter(id => id !== plotId);
      } else {
        return [...prev, plotId];
      }
    });
  };

  const isShortlisted = (plotId) => shortlists.includes(plotId);

  const addPlot = (newPlot) => {
    const plotWithId = {
      ...newPlot,
      id: newPlot.id || `plot-${Date.now()}`,
      created: new Date().toISOString().split('T')[0],
      views: 1,
      leads: 0,
      status: newPlot.status || 'published'
    };
    setListings(prev => [plotWithId, ...prev]);
    return plotWithId;
  };

  const updatePlotStatus = (plotId, status) => {
    setListings(prev => prev.map(p => p.id === plotId ? { ...p, status } : p));
  };

  const scheduleVisit = (visitData) => {
    const visit = {
      id: `visit-${Date.now()}`,
      status: "Scheduled",
      created: new Date().toISOString().split('T')[0],
      ...visitData
    };
    setSiteVisits(prev => [visit, ...prev]);

    // Also add to seller leads
    const newLead = {
      id: `lead-${Date.now()}`,
      buyer_name: visitData.visitor_name,
      buyer_phone: visitData.visitor_phone,
      buyer_email: visitData.visitor_email,
      plot_id: visitData.plot_id,
      plot_name: visitData.plot_name,
      requirement: `Site Visit on ${visitData.visit_date} at ${visitData.visit_time}`,
      status: "New",
      created: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [newLead, ...prev]);

    return visit;
  };

  const addLead = (leadData) => {
    const lead = {
      id: `lead-${Date.now()}`,
      status: "New",
      created: new Date().toISOString().split('T')[0],
      ...leadData
    };
    setLeads(prev => [lead, ...prev]);
    return lead;
  };

  const addContactMessage = (msgData) => {
    const msg = {
      id: `msg-${Date.now()}`,
      status: "New",
      created: new Date().toISOString().split('T')[0],
      ...msgData
    };
    setContactMessages(prev => [msg, ...prev]);
    return msg;
  };

  return (
    <DataContext.Provider
      value={{
        listings,
        shortlists,
        siteVisits,
        leads,
        contactMessages,
        toggleShortlist,
        isShortlisted,
        addPlot,
        updatePlotStatus,
        scheduleVisit,
        addLead,
        addContactMessage
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
