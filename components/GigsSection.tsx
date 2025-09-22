import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Music2 } from "lucide-react";

interface Gig {
  id: string;
  title: string;
  date: string;
  startDate: string;
  endDate?: string;
  location?: string;
}

export default function GigsSection(): React.JSX.Element {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pastGigsPage, setPastGigsPage] = useState<number>(0);
  const [upcomingGigsPage, setUpcomingGigsPage] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMorePast, setHasMorePast] = useState<boolean>(true);
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState<boolean>(true);
  const pastScrollRef = useRef<HTMLDivElement>(null);
  const upcomingScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      setLoading(true);

      // Fetch gigs from secure serverless function (works in both dev and production)
      const response = await fetch("/.netlify/functions/gigs");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const gigs = await response.json();
      setGigs(gigs);
    } catch (err) {
      console.error("Error fetching gigs:", err);
      setGigs([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    const formatted = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);

    // Remove comma after weekday: "Thu, Jan 23 2025" -> "Thu Jan 23 2025"
    return formatted.replace(/,/g, "");
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatTimeRange = (startDate: string | undefined, endDate?: string) => {
    if (!startDate) return "";

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (!end) {
      return formatTime(start);
    }

    // If same day, show time range
    if (start.toDateString() === end.toDateString()) {
      return `${formatTime(start)} - ${formatTime(end)}`;
    }

    // If different days, show full date-time range
    return `${formatTime(start)} - ${formatTime(end)}`;
  };

  const isUpcoming = (date: string) => new Date(date) > new Date();
  const allUpcomingGigs = gigs.filter((gig) => isUpcoming(gig.date));
  const allPastGigs = gigs.filter((gig) => !isUpcoming(gig.date)).reverse();

  // Show 6 gigs initially (2 rows of 3), then load 6 more per page
  const gigsPerPage = 6;
  const upcomingGigs = allUpcomingGigs.slice(
    0,
    gigsPerPage + upcomingGigsPage * gigsPerPage,
  );
  const pastGigs = allPastGigs.slice(
    0,
    gigsPerPage + pastGigsPage * gigsPerPage,
  );

  const loadMoreGigs = useCallback(
    async (isUpcomingSection: boolean) => {
      if (loadingMore) return;

      const currentPage = isUpcomingSection ? upcomingGigsPage : pastGigsPage;
      const totalGigs = isUpcomingSection
        ? allUpcomingGigs.length
        : allPastGigs.length;
      const currentShown = gigsPerPage + currentPage * gigsPerPage;

      if (currentShown >= totalGigs) {
        if (isUpcomingSection) setHasMoreUpcoming(false);
        else setHasMorePast(false);
        return;
      }

      setLoadingMore(true);

      // Simulate API call delay
      setTimeout(() => {
        if (isUpcomingSection) {
          setUpcomingGigsPage((prev) => prev + 1);
        } else {
          setPastGigsPage((prev) => prev + 1);
        }
        setLoadingMore(false);
      }, 500);
    },
    [
      upcomingGigsPage,
      pastGigsPage,
      loadingMore,
      allUpcomingGigs.length,
      allPastGigs.length,
      gigsPerPage,
    ],
  );

  const handleScroll = useCallback(
    (scrollContainer: HTMLDivElement | null, isUpcomingSection: boolean) => {
      if (!scrollContainer) return;

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const scrollPercentage = (scrollLeft + clientWidth) / scrollWidth;

      const hasMore = isUpcomingSection ? hasMoreUpcoming : hasMorePast;

      if (scrollPercentage > 0.8 && hasMore && !loadingMore) {
        loadMoreGigs(isUpcomingSection);
      }
    },
    [loadMoreGigs, hasMoreUpcoming, hasMorePast, loadingMore],
  );

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass rounded-xl p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-4 mx-auto w-64"></div>
              <div className="h-4 bg-gray-700 rounded mb-8 mx-auto w-96"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gigs" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 flex items-center justify-center">
            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-accent-primary mr-2 sm:mr-3" />
            <span className="gradient-text font-semibold">Shows</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
            Upcoming and past performances.
          </p>
        </motion.div>

        {/* Upcoming Shows */}
        {upcomingGigs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Calendar className="w-6 h-6 text-accent-primary mr-3" />
              <h3 className="text-2xl font-semibold text-text-primary">
                Upcoming
              </h3>
            </div>

            <div
              ref={upcomingScrollRef}
              className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-accent-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-accent-primary/40"
              style={{ scrollbarGutter: "stable" }}
              onScroll={(e) => handleScroll(e.currentTarget, true)}
            >
              <div className="flex gap-4 sm:gap-6 w-fit">
                {upcomingGigs.map((gig, index) => (
                  <motion.div
                    key={gig.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group glass rounded-xl p-4 sm:p-6 hover-lift transition-all duration-300 w-72 sm:w-80 flex-shrink-0"
                  >
                    <div className="bg-accent-primary text-black rounded-lg p-3 sm:p-4 mb-4 inline-block w-16 sm:w-20">
                      <div className="text-center">
                        <div className="text-xs font-medium">
                          {formatDate(new Date(gig.date)).split(" ")[0]}
                        </div>
                        <div className="text-lg font-bold">
                          {formatDate(new Date(gig.date)).split(" ")[1]}
                        </div>
                        <div className="text-xs font-medium">
                          {formatDate(new Date(gig.date)).split(" ")[2]}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg sm:text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                      {gig.title.replace("GIG: ", "")}
                    </h4>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-text-secondary">
                        <Clock className="w-4 h-4 mr-2 text-accent-secondary" />
                        <span className="text-sm">
                          {formatTimeRange(gig.startDate, gig.endDate)}
                        </span>
                      </div>

                      {gig.location && (
                        <div className="flex items-start text-text-secondary">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-accent-secondary" />
                          <span className="text-sm">{gig.location}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {loadingMore && (
                  <div className="w-72 sm:w-80 flex items-center justify-center flex-shrink-0">
                    <div className="glass rounded-xl p-6 text-center">
                      <div className="animate-spin w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <div className="text-sm text-text-muted">
                        Loading more shows...
                      </div>
                    </div>
                  </div>
                )}
                {hasMoreUpcoming &&
                  !loadingMore &&
                  allUpcomingGigs.length > upcomingGigs.length && (
                    <div className="w-72 sm:w-80 flex items-center justify-center flex-shrink-0">
                      <div className="glass rounded-xl p-6 text-center">
                        <div className="text-text-secondary mb-2">
                          +{allUpcomingGigs.length - upcomingGigs.length} more
                          shows
                        </div>
                        <div className="text-sm text-text-muted">
                          Keep scrolling to load
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="glass rounded-xl p-6 sm:p-8">
              <Calendar className="w-16 h-16 text-accent-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl sm:text-2xl font-semibold text-text-primary mb-4">
                No Shows Scheduled
              </h3>
              <p className="text-text-secondary mb-6">
                Stay tuned for announcements about future performances!
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-accent-primary hover:bg-accent-secondary text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book a Show</span>
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Past Shows */}
        {pastGigs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <Music2 className="w-6 h-6 text-accent-secondary mr-3" />
              <h3 className="text-2xl font-semibold text-text-primary">
                Past Shows
              </h3>
            </div>

            <div
              ref={pastScrollRef}
              className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-thin scrollbar-thumb-accent-secondary/20 scrollbar-track-transparent hover:scrollbar-thumb-accent-secondary/40"
              style={{ scrollbarGutter: "stable" }}
              onScroll={(e) => handleScroll(e.currentTarget, false)}
            >
              <div className="flex gap-4 sm:gap-6 w-fit">
                {pastGigs.map((gig, index) => (
                  <motion.div
                    key={gig.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group glass rounded-xl p-6 hover-lift transition-all duration-300 opacity-75 w-72 sm:w-80 flex-shrink-0"
                  >
                    <div className="bg-accent-tertiary text-white rounded-lg p-3 sm:p-4 mb-4 inline-block w-16 sm:w-20">
                      <div className="text-center">
                        <div className="text-xs font-medium">
                          {formatDate(new Date(gig.date)).split(" ")[0]}
                        </div>
                        <div className="text-lg font-bold">
                          {formatDate(new Date(gig.date)).split(" ")[1]}
                        </div>
                        <div className="text-xs font-medium">
                          {formatDate(new Date(gig.date)).split(" ")[2]}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-text-secondary mb-2 group-hover:text-accent-secondary transition-colors duration-300">
                      {gig.title.replace("GIG: ", "")}
                    </h4>

                    {gig.location && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-start text-text-muted">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 text-accent-tertiary" />
                          <span className="text-sm">{gig.location}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                {loadingMore && (
                  <div className="w-80 sm:w-96 flex items-center justify-center">
                    <div className="glass rounded-xl p-6 text-center">
                      <div className="animate-spin w-6 h-6 border-2 border-accent-secondary border-t-transparent rounded-full mx-auto mb-2"></div>
                      <div className="text-sm text-text-muted">
                        Loading more shows...
                      </div>
                    </div>
                  </div>
                )}
                {hasMorePast &&
                  !loadingMore &&
                  allPastGigs.length > pastGigs.length && (
                    <div className="w-80 sm:w-96 flex items-center justify-center">
                      <div className="glass rounded-xl p-6 text-center">
                        <div className="text-text-secondary mb-2">
                          +{allPastGigs.length - pastGigs.length} more shows
                        </div>
                        <div className="text-sm text-text-muted">
                          Keep scrolling to load
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
