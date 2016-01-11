#!/usr/bin/python
#
# Enhanced data plotter for nfsiostat output. Feb. 14, 2013
#
# Copyright Jeffrey B. Layton
#
# License: GNU GPL v2 (http://www.gnu.org/licenses/old-licenses/gpl-2.0.html)
# Version 2, June 1991
#
# Copyright (C) 1989, 1991 Free Software Foundation, Inc.  
# 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
#
# Everyone is permitted to copy and distribute verbatim copies
# of this license document, but changing it is not allowed.
#
#
#
# To run the application first gather the nfsiostat information using:
#
# [laytonjb ~]$ nfsiostat -h -m -t 1 100 > nfsiostat.out
#
# "1 100" which tells nfsiostat to use "1" second intervals  and "100" 
# means to gather data for 100 internvals (or 100 sceonds in this case).
#
# Then to run nfsiostat_plotter, the command is,
#
# [laytonjb ~]$ nfsiostat_plotter.py nfsiostat.out
#
# where "nfsiostat.out" is the output from nfsiostat. The code is written
# in Python (obviously) and uses the shlex, time, os, and matplotlib
# modules. nfsiostat_plotter is smart enough to gather the data for each
# device and plot them separately.
#
# When nfsiostat_plotter is done it will create a subdirectory "HTML_REPORT"
# that contains the plots and an html file "report.html". Open that
# html file in a browser or word processor and you will see the plots
# and a small write-up about them. Feel free to modify the code but
# please send back changes.
#

import sys
try:
   import shlex                      # Needed for splitting input lines
except ImportError:
   print "Cannot import shlex module - this is needed for this application.";
   print "Exiting..."
   sys.exit();

try:
   import time;                       # Needed for time conversion function
   time_var = 1
except:
   time_var = 0;
   print "Cannot import time module - this is needed for this application.";
   print "Exiting..."
   sys.exit();

try:
   import matplotlib.pyplot as plt;   # Needed for plots
   matplotlib_var = 1
except:
   matplotlib_var = 0;
   print "Cannot import matplotlib module - this is needed for this application.";
   print "Exiting..."
   sys.exit();

try:
   import os                          # Needed for mkdir
except ImportError:
   print "Cannot import os module - this is needed for this application.";
   print "Exiting..."
   sys.exit();

try:
   import pickle                      # Needed for pickle
   pickle_success = 1;
except ImportError:
   print "Cannot import pickle module - this is not needed for this application.";
   print "Continuing to process";
   pickle_success = 0;



def Plot9(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, x8, y8, x9, y9,
          xlabel, ylabel1, ylabel2, ylabel3, ylabel4, ylabel5, ylable6, ylabel7, ylable8, ylable9, 
          d1, d2, d3, d4, d5, d6, d7, d8, d9, fsize, filename):
   #
   # Creates 3 vertically stacked subplots with y-axis legends and one 
   #   x-axis label at the the bottom
   #
   # x1 = x-axis data for top plot
   # x2 = x-axis data for middle plot
   # x3 = x-axis data for bottom plot
   # y1 = y-axis data for top plot
   # y2 = y-axis data for middle plot
   # y3 = y-axis data for bottom plot
   # xlabel = x-axis label (only on bottom plot)
   # ylabel1 = label for top y-axis
   # ylabel2 = label for middle y-axis
   # ylabel3 = label for bottom plot
   # d1 = data label for top plot
   # d2 = data label for middle plot
   # d3 = data label for bottom plot
   # fisze = font size for tick marks, axes labels, and legend labels
   # filename = name of file for plot output
   #
   
   # Top plot
   ax1 = plt.subplot(911);                # Define top plot using subplot function
   plt.plot(x1,y1, "bo-", label=d1);      # Plot the first data set with a red line wiht "o" as a symbol
   plt.grid();                            # Plot the grid
   plt.xlabel(" ");                       # Don't put an x-axis label since it's the top plot
   plt.ylabel(ylabel1, fontsize=fsize, multialignment='center');   # y-axis label
   ax1.set_xticklabels([]);               # get x-axis tick label
   leg1 = plt.legend(loc=1);              # Create legend in upper right corner (loc=1)
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");          # Make legend box have a gray background
   for t in leg1.get_texts():
      t.set_fontsize(fsize);              # Change the font size of the legend text to 10 pt.
   # end for
   #plt.tick_params(axis='both', which='minor', labelsize=8)
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   ax2 = plt.subplot(912);
   plt.plot(x2,y2, "go-", label=d2);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel2, fontsize=fsize, multialignment='center');
   ax2.set_xticklabels([]);
   leg2 = plt.legend(loc=1);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(913);
   plt.plot(x3,y3, "ro-", label=d3);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel3, fontsize=fsize, multialignment='center');
   leg3 = plt.legend(loc=1);
   frame3 = leg3.get_frame();
   frame3.set_facecolor("0.80");
   for t in leg3.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(914);
   plt.plot(x4,y4, "co-", label=d4);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel4, fontsize=fsize, multialignment='center');
   leg4 = plt.legend(loc=1);
   frame4 = leg4.get_frame();
   frame4.set_facecolor("0.80");
   for t in leg4.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(915);
   plt.plot(x5,y5, "mo-", label=d5);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel5, fontsize=fsize, multialignment='center');
   leg4 = plt.legend(loc=1);
   frame5 = leg5.get_frame();
   frame5.set_facecolor("0.80");
   for t in leg5.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(916);
   plt.plot(x6,y6, "yo-", label=d6);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel6, fontsize=fsize, multialignment='center');
   leg6 = plt.legend(loc=1);
   frame6 = leg6.get_frame();
   frame6.set_facecolor("0.80");
   for t in leg6.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(917);
   plt.plot(x7,y7, "bo-", label=d7);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel7, fontsize=fsize, multialignment='center');
   leg7 = plt.legend(loc=1);
   frame7 = leg7.get_frame();
   frame7.set_facecolor("0.80");
   for t in leg7.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(918);
   plt.plot(x8,y8, "go-", label=d8);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel8, fontsize=fsize, multialignment='center');
   leg8 = plt.legend(loc=1);
   frame8 = leg8.get_frame();
   frame8.set_facecolor("0.80");
   for t in leg8.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Bottom
   plt.subplot(919);
   plt.plot(x9,y9, "ro-", label=d9);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel9, fontsize=fsize, multialignment='center');
   leg9 = plt.legend(loc=1);
   frame9 = leg9.get_frame();
   frame9.set_facecolor("0.80");
   for t in leg9.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   #
   F = plt.gcf();
   DPI = F.get_dpi()
   #print "DPI:", DPI
   DefaultSize = F.get_size_inches()
   #print "Default size in Inches", DefaultSize
   #print "Which should result in a %i x %i Image"%(DPI*DefaultSize[0], DPI*DefaultSize[1])
   
   F.set_figsize_inches( (DefaultSize[0], DefaultSize[1]*2.5) )
   Size = F.get_size_inches()
   #print "Size in Inches", Size
   
   # Either save the plot to a file or display it to the screen
   if (len(filename) == 0):
      plt.show();
   else:
      plt.savefig(filename);
      plt.close();
   # end if
   
# end def





def Plot5(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, xlabel, ylabel1, ylabel2,
          ylabel3, ylabel4, ylabel5, d1, d2, d3, d4, d5, fsize, filename):
   #
   # Creates 3 vertically stacked subplots with y-axis legends and one 
   #   x-axis label at the the bottom
   #
   # x1 = x-axis data for top plot
   # x2 = x-axis data for middle plot
   # x3 = x-axis data for bottom plot
   # y1 = y-axis data for top plot
   # y2 = y-axis data for middle plot
   # y3 = y-axis data for bottom plot
   # xlabel = x-axis label (only on bottom plot)
   # ylabel1 = label for top y-axis
   # ylabel2 = label for middle y-axis
   # ylabel3 = label for bottom plot
   # d1 = data label for top plot
   # d2 = data label for middle plot
   # d3 = data label for bottom plot
   # fisze = font size for tick marks, axes labels, and legend labels
   # filename = name of file for plot output
   #
   
   # Top plot
   ax1 = plt.subplot(511);                # Define top plot using subplot function
   plt.plot(x1,y1, "ro-", label=d1);      # Plot the first data set with a red line wiht "o" as a symbol
   plt.grid();                            # Plot the grid
   plt.xlabel(" ");                       # Don't put an x-axis label since it's the top plot
   plt.ylabel(ylabel1, fontsize=fsize, multialignment='center');   # y-axis label
   ax1.set_xticklabels([]);               # get x-axis tick label
   leg1 = plt.legend(loc=1);              # Create legend in upper right corner (loc=1)
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");          # Make legend box have a gray background
   for t in leg1.get_texts():
      t.set_fontsize(fsize);              # Change the font size of the legend text to 10 pt.
   # end for
   #plt.tick_params(axis='both', which='minor', labelsize=8)
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   ax2 = plt.subplot(512);
   plt.plot(x2,y2, "bo-", label=d2);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel2, fontsize=fsize, multialignment='center');
   ax2.set_xticklabels([]);
   leg2 = plt.legend(loc=1);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(513);
   plt.plot(x3,y3, "go-", label=d3);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel3, fontsize=fsize, multialignment='center');
   leg3 = plt.legend(loc=1);
   frame3 = leg3.get_frame();
   frame3.set_facecolor("0.80");
   for t in leg3.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Next plot down
   plt.subplot(514);
   plt.plot(x4,y4, "go-", label=d4);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel4, fontsize=fsize, multialignment='center');
   leg4 = plt.legend(loc=1);
   frame4 = leg4.get_frame();
   frame4.set_facecolor("0.80");
   for t in leg4.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Bottom
   plt.subplot(515);
   plt.plot(x5,y5, "go-", label=d5);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel5, fontsize=fsize, multialignment='center');
   leg5 = plt.legend(loc=1);
   frame5 = leg5.get_frame();
   frame5.set_facecolor("0.80");
   for t in leg5.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   #
   F = plt.gcf();
   DPI = F.get_dpi()
   #print "DPI:", DPI
   DefaultSize = F.get_size_inches()
   #print "Default size in Inches", DefaultSize
   #print "Which should result in a %i x %i Image"%(DPI*DefaultSize[0], DPI*DefaultSize[1])
   
   F.set_figsize_inches( (DefaultSize[0], DefaultSize[1]*1.5) )
   Size = F.get_size_inches()
   #print "Size in Inches", Size
   
   # Either save the plot to a file or display it to the screen
   if (len(filename) == 0):
      plt.show();
   else:
      plt.savefig(filename);
      plt.close();
   # end if
   
# end def



def Plot4(x1, y1, x2, y2, x3, y3, y4, xlabel, ylabel1, ylabel2, ylabel3, ylable4,
          d1, d2, d3, d4, fsize, filename):
   #
   # Creates 4 vertically stacked subplots with y-axis legends and one 
   #   x-axis label at the the bottom
   #
   # x1 = x-axis data for top plot
   # x2 = x-axis data for middle plot
   # x3 = x-axis data for bottom plot
   # y1 = y-axis data for top plot
   # y2 = y-axis data for middle plot
   # y3 = y-axis data for bottom plot
   # y4 = y-axis data for bottom plot
   # xlabel = x-axis label (only on bottom plot)
   # ylabel1 = label for top y-axis
   # ylabel2 = label for middle y-axis
   # ylabel3 = label for bottom plot
   # ylabel4 = label for bottom plot
   # d1 = data label for top plot
   # d2 = data label for middle plot
   # d3 = data label for bottom plot
   # d4 = data label for bottom plot
   # fisze = font size for tick marks, axes labels, and legend labels
   # filename = name of file for plot output
   #
   
   # Top plot
   ax1 = plt.subplot(411);                # Define top plot using subplot function
   plt.plot(x1,y1, "ro-", label=d1);      # Plot the first data set with a red line wiht "o" as a symbol
   plt.grid();                            # Plot the grid
   plt.xlabel(" ");                       # Don't put an x-axis label since it's the top plot
   plt.ylabel(ylabel1, fontsize=fsize, multialignment='center');   # y-axis label
   ax1.set_xticklabels([]);               # get x-axis tick label
   leg1 = plt.legend(loc=1);              # Create legend in upper right corner (loc=1)
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");          # Make legend box have a gray background
   for t in leg1.get_texts():
      t.set_fontsize(fsize);              # Change the font size of the legend text to 10 pt.
   # end for
   #plt.tick_params(axis='both', which='minor', labelsize=8)
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Middle top plot
   ax2 = plt.subplot(412);
   plt.plot(x2,y2, "bo-", label=d2);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel2, fontsize=fsize, multialignment='center');
   ax2.set_xticklabels([]);
   leg2 = plt.legend(loc=1);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Middle bottom plot
   ax3 = plt.subplot(413);
   plt.plot(x3,y3, "co-", label=d3);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel3, fontsize=fsize, multialignment='center');
   ax3.set_xticklabels([]);
   leg3 = plt.legend(loc=1);
   frame3 = leg3.get_frame();
   frame3.set_facecolor("0.80");
   for t in leg3.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Bottom plot
   plt.subplot(414);
   plt.plot(x4,y4, "go-", label=d4);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel4, fontsize=fsize, multialignment='center');
   leg4 = plt.legend(loc=1);
   frame4 = leg4.get_frame();
   frame4.set_facecolor("0.80");
   for t in leg4.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Either save the plot to a file or display it to the screen
   if (len(filename) == 0):
      plt.show();
   else:
      plt.savefig(filename);
      plt.close();
   # end if
   
# end def




def Plot3(x1, y1, x2, y2, x3, y3, xlabel, ylabel1, ylabel2, ylabel3, 
          d1, d2, d3, fsize, filename):
   #
   # Creates 3 vertically stacked subplots with y-axis legends and one 
   #   x-axis label at the the bottom
   #
   # x1 = x-axis data for top plot
   # x2 = x-axis data for middle plot
   # x3 = x-axis data for bottom plot
   # y1 = y-axis data for top plot
   # y2 = y-axis data for middle plot
   # y3 = y-axis data for bottom plot
   # xlabel = x-axis label (only on bottom plot)
   # ylabel1 = label for top y-axis
   # ylabel2 = label for middle y-axis
   # ylabel3 = label for bottom plot
   # d1 = data label for top plot
   # d2 = data label for middle plot
   # d3 = data label for bottom plot
   # fisze = font size for tick marks, axes labels, and legend labels
   # filename = name of file for plot output
   #
   
   # Top plot
   ax1 = plt.subplot(311);                # Define top plot using subplot function
   plt.plot(x1,y1, "ro-", label=d1);      # Plot the first data set with a red line wiht "o" as a symbol
   plt.grid();                            # Plot the grid
   plt.xlabel(" ");                       # Don't put an x-axis label since it's the top plot
   plt.ylabel(ylabel1, fontsize=fsize, multialignment='center');   # y-axis label
   ax1.set_xticklabels([]);               # get x-axis tick label
   leg1 = plt.legend(loc=1);              # Create legend in upper right corner (loc=1)
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");          # Make legend box have a gray background
   for t in leg1.get_texts():
      t.set_fontsize(fsize);              # Change the font size of the legend text to 10 pt.
   # end for
   #plt.tick_params(axis='both', which='minor', labelsize=8)
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Middle plot
   ax2 = plt.subplot(312);
   plt.plot(x2,y2, "bo-", label=d2);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel2, fontsize=fsize, multialignment='center');
   ax2.set_xticklabels([]);
   leg2 = plt.legend(loc=1);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Bottom plot
   plt.subplot(313);
   plt.plot(x3,y3, "go-", label=d3);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel3, fontsize=fsize, multialignment='center');
   leg3 = plt.legend(loc=1);
   frame3 = leg3.get_frame();
   frame3.set_facecolor("0.80");
   for t in leg3.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   #
   F = plt.gcf();
   DPI = F.get_dpi()
   print "DPI:", DPI
   DefaultSize = F.get_size_inches()
   print "Default size in Inches", DefaultSize
   print "Which should result in a %i x %i Image"%(DPI*DefaultSize[0], DPI*DefaultSize[1])
   
   F.set_figsize_inches( (DefaultSize[0], DefaultSize[1]*2) )
   Size = F.get_size_inches()
   print "Size in Inches", Size
   
   # Either save the plot to a file or display it to the screen
   if (len(filename) == 0):
      plt.show();
   else:
      plt.savefig(filename);
      plt.close();
   # end if
   
# end def



def Plot2(x1, y1, x2, y2, xlabel, ylabel1, ylabel2, d1, d2, fsize, filename):
   #
   # Creates 2 vertically stacked subplots with labled y-axis, legends and
   #   one x-axis label at the bottom
   #
   # x1 = x-axis data for top plot
   # x2 = x-axis data for bottom plot
   # y1 = y-axis data for top plot
   # y2 = y-axis data for bottom plot
   # xlabel = x-axis label (only on bottom plot)
   # ylabel1 = label for top y-axis
   # ylabel2 = label for bottom y-axis
   # d1 = data label for top plot
   # d2 = data label for bottom plot
   # fisze = font size for tick marks, axes labels, and legend labels
   # filename = name of file for plot output
   #
   
   # Top plot
   ax1 = plt.subplot(211);
   plt.plot(x1,y1, "ro-", label=d1);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel1, fontsize=fsize, multialignment='center');
   ax1.set_xticklabels([]);
   leg1 = plt.legend(loc=1);
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");
   for t in leg1.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Bottom Plot
   plt.subplot(212);
   plt.plot(x2,y2, "go-", label=d2);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel2, fontsize=fsize, multialignment='center');
   leg2 = plt.legend(loc=1);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(10);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   if (len(filename) == 0):
      plt.show();
   else:
      plt.savefig(filename);
      plt.close();
   # end if
   
# end def



def Plot1(x, y, xlabel, ylabel, d, fsize, filename):
   #
   # Creates 1 chart with a legend and 1 x-axis label
   #
   # x = x-axis data
   # y = y-axis data
   # xlabel = x-axis label
   # ylabel1 = label for y-axis
   # d = data label
   # fisze = font size for tick marks, axes labels, and legend labels
   # filename = name of file for plot output
   #
   
   plt.plot(x,y, "go-", label=d);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel, fontsize=fsize, multialignment='center');
   leg = plt.legend(loc=1);
   frame = leg.get_frame();
   frame.set_facecolor("0.80");
   for t in leg.get_texts():
      t.set_fontsize(fsize);
   # end for
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   if (len(filename) == 0):
      plt.show();
   else:
      plt.savefig(filename);
      plt.close();
   # end if
   
# end def






# ===================
# Main Python section
# ===================

if __name__ == '__main__':

   print "nfsiostat plotting script (includes iostat data)";
   input_filename = sys.argv[1];  # Get input file
   print " ";
   print "input filename: ",input_filename;
   
   # Read iostat pickle:
   if (pickle_success > 0):
      print "I like to unpickle it, unpickle it";
      pickle_file = open('iostat_file.pickle', 'r');
      
      iostat_dict = pickle.load(pickle_file);
      
      # unravel iostat_dict
      iostat_cpu_data = iostat_dict["cpu_data"];
      iostat_user_list = iostat_dict["cpu_data"]["user_list"];
      iostat_nice_list = iostat_dict["cpu_data"]["nice_list"];
      iostat_system_list = iostat_dict["cpu_data"]["system_list"];
      iostat_iowait_list = iostat_dict["cpu_data"]["iowait_list"];
      iostat_steal_list = iostat_dict["cpu_data"]["steal_list"];
      iostat_idle_list = iostat_dict["cpu_data"]["idle_list"];
      iostat_cpu_lables = iostat_dict["cpu_data"]["cpu_labels"];
      iostat_time_sum_list = iostat_dict["cpu_data"]["time_sum_list"];
      
      iostat_date_list = iostat_dict["time_data"]["date_list"];
      iostat_time_list = iostat_dict["time_data"]["time_list"];
      iostat_meridian_list = iostat_dict["time_data"]["meridian_list"];
      
      iostat_x_seconds = iostat_dict["x_seconds"];
      
      iostat_kernel = iostat_dict["system_info"]["kernel"];
      iostat_system_name = iostat_dict["system_info"]["system_name"];
      iostat_date = iostat_dict["system_info"]["date"];
      iostat_CPU = iostat_dict["system_info"]["CPU"];
      iostat_cores = iostat_dict["system_info"]["cores"];
      
      iostat_device_data_list = iostat_dict["device_data_list"];
      
      pickle_file.close();
   # end if
   
   # Initialize lists that will store data
   date_list = [];
   time_list = [];
   meridian_list = [];
   
   # Master dictionary of fs data
   fs_data_list = [];
   # List element is dictionary:
   #   local_dict{"filesystem"} = "file system name"
   #   local_dict{"rMB_nor"} = [];
   #   local_dict{"wMB_nor"} = [];
   #   local_dict{"rMB_dir"} = [];
   #   local_dict{"wMB_dir"} = [];
   #   local_dict{"rMB_svr"} = [];
   #   local_dict{"wMB_svr"} = [];
   #   local_dict{"ops"} = [];
   #   local_dict{"rops"} = [];
   #   local_dict{"wops"} = [];
   
   # flags for controlling flow
   iflow_flag = 1;
   
   # Define fixed variables
   fsize = 8;
   
   # loop over lines in input file
   print " ";
   print "reading nfsiostat output file ... ";
   icount = 0;
   for line in open(input_filename,'r').readlines():
      currentline = shlex.split(line);
      
      if (len(currentline) > 0):
         if (iflow_flag == 5):
            #print "   Reading and Storing fs values";
            local_fs = temp_fs;
            if (len(fs_data_list) == 0):
               #print "      Adding new fs"
               local_dict = {};
               local_dict["fs"] = local_fs;
               local_dict["rMB_nor"]=[float(currentline[0])];
               local_dict["wMB_nor"]=[float(currentline[1])];
               local_dict["rMB_dir"]=[float(currentline[2])]; 
               local_dict["wMB_dir"]=[float(currentline[3])];
               local_dict["rMB_svr"]=[float(currentline[4])];
               local_dict["wMB_svr"]=[float(currentline[5])];
               local_dict["ops"]=[float(currentline[6])];
               local_dict["rops"]=[float(currentline[7])];
               local_dict["wops"]=[float(currentline[8])];
               fs_data_list.append(local_dict);
            else:
               # search for file system - add it if not new
               ifind = 0;
               for iloop in range(0, len(fs_data_list) ):
                  item = fs_data_list[iloop];
                  if (item["fs"] == local_fs):
                     #print "         adding data to existing fs";
                     fs_data_list[iloop]["rMB_nor"].append(float(currentline[0]));            
                     fs_data_list[iloop]["wMB_nor"].append(float(currentline[1]));
                     fs_data_list[iloop]["rMB_dir"].append(float(currentline[2]));            
                     fs_data_list[iloop]["wMB_dir"].append(float(currentline[3]));
                     fs_data_list[iloop]["rMB_svr"].append(float(currentline[4]));            
                     fs_data_list[iloop]["wMB_svr"].append(float(currentline[5]));
                     fs_data_list[iloop]["ops"].append(float(currentline[6]));            
                     fs_data_list[iloop]["rops"].append(float(currentline[7]));
                     fs_data_list[iloop]["wops"].append(float(currentline[8]));
                     ifind = 1;
                  # end if
               # end
               if (ifind == 0):
                  #print "      Adding data to new fs";
                  local_dict = {};
                  local_dict["fs"] = temp_fs;
                  local_dict["rMB_nor"]=[float(currentline[0])];
                  local_dict["wMB_nor"]=[float(currentline[1])];
                  local_dict["rMB_dir"]=[float(currentline[2])]; 
                  local_dict["wMB_dir"]=[float(currentline[3])];
                  local_dict["rMB_svr"]=[float(currentline[4])];
                  local_dict["wMB_svr"]=[float(currentline[5])];
                  local_dict["ops"]=[float(currentline[6])];
                  local_dict["rops"]=[float(currentline[7])];
                  local_dict["wops"]=[float(currentline[8])];
                  fs_data_list.append(local_dict);
               # end if
            # end if
            iflow_flag = 2;
         elif (iflow_flag == 4):
            #print "   Reading file system";
            temp_fs = currentline[0];
            iflow_flag = 5;
         elif (iflow_flag == 3):
            #print "      Reading and storing fs headers";
            cpu_labels = [];
            cpu_labels = currentline;
	    iflow_flag = 4;
         elif (iflow_flag == 2):
            #print "   Reading time information";
            date_list.append(currentline[0].replace("/"," "));
            # if meridian is PM then need to add 12 hours to time_list
            if (currentline[2] == "PM"):
               junk1 = currentline[1].replace(":"," ");
               junk2 = shlex.split(junk1);
               junk3 = int(junk2[0]) + 12;
               junk4 = str(junk3) + ":" + junk2[1] + ":" + junk2[2];
               time_list.append(junk4);
            else:
               time_list.append(currentline[1]);
            # end if
            meridian_list.append(currentline[2]);
            iflow_flag = 3;
            icount = icount + 1;
         elif (iflow_flag == 1):
            #print "   Read system information";
            system_info = {};
            system_info["OS"] = currentline[0];
            system_info["kernel"] = currentline[1];
            system_info["system_name"] = currentline[2][1:len(currentline[2])-1];
            system_info["date"] = currentline[3];
            system_info["CPU"] = currentline[4];
            system_info["cores"] = currentline[5][1:];
            iflow_flag = 2;
         # end if
      else:
         #print "   Finished reading section - get ready for next section";
         if (iflow_flag == 1):
            iflow_flag = 2;
         elif (iflow_flag >= 2):
            iflow_flag = 2;
         # end if
      # end if
   # end for
   print "Finished reading ",icount," data points for ",len(fs_data_list)," NFS mounted file systems.";
   print "Creating plots and HTML report";
   
   # Create time list for x-axis data (need to convert to regular time format)
   x_seconds = [];
   for i in range(0,len(date_list)):
      test2 = shlex.split(date_list[i]);
      test3 = test2[2] + "-" + test2[0] + "-" + test2[1];
      
      junk1 = test3 + " " + time_list[i];
      ts = time.mktime(time.strptime(junk1, '%Y-%m-%d %H:%M:%S'));
      if (i == 0):
         BeginTime = ts;
         x_seconds.append(0.0);
      else:
         x_seconds.append( (ts - BeginTime) );
      # end if
   # end of
   
   # 
   # HTML Report initialization
   #    Write all data files to subdirectory called HTML_REPORT
   #    File is report.html
   dirname ="./HTML_REPORT";
   if not os.path.exists(dirname):
      os.makedirs(dirname);
   # end if
   html_filename = dirname + '/report.html';
   f = open(html_filename, 'w')
   
   # Print HTML Report header
   output_str = "<H2>\n";
   output_str = output_str + "NFSIOSTAT Report for file: " + input_filename + " \n";
   output_str = output_str + "</H2>\n";
   output_str = output_str + " \n";
   
   # HTML Introduction
   output_str = "<H3>\n";
   output_str = output_str + "Introduction \n";
   output_str = output_str + "</H3> \n \n";
   output_str = output_str + "<P>This report plots the nfsiostat output contained in file: \n";
   output_str = output_str + sys.argv[1] + ". The filesystems analyzed are: \n";
   output_str = output_str + "<UL> \n";
   for item in fs_data_list:
      output_str = output_str + "   <LI>" + item["fs"] + " \n";
   # end if
   output_str = output_str + "</UL> \n";
   output_str = output_str + "For each filesystem there are a series of plots of the output \n";
   output_str = output_str + "from nfsiostat that was captured. The report is contained in a\n";
   output_str = output_str + "subdirectory HTML_REPORT. In that directory you will find a \n";
   output_str = output_str + "file name report.html. Just open that file in a browser \n";
   output_str = output_str + "and you will see the plots. Please note that all plots are \n";
   output_str = output_str + "referenced to the beginning time of the nfsiostat run. </P>\n";
   output_str = output_str + " \n";
   f.write(output_str);
   
   # HTML System Output (from iostat):
   output_str = "<P>NFSiostat outputs a number of basic system parameters when it\n";
   output_str = output_str + "creates the output. These parameters are listed below. \n";
   output_str = output_str + "<UL> \n";
   output_str = output_str + "   <LI>System Name: " + system_info["system_name"] + " \n";
   output_str = output_str + "   <LI>OS: " + system_info["OS"] + " \n";
   output_str = output_str + "   <LI>Kernel: " + system_info["kernel"] + " \n";
   output_str = output_str + "   <LI>Number of Cores " + system_info["cores"] + " \n";
   output_str = output_str + "   <LI>Core Type " + system_info["CPU"] + " \n";
   output_str = output_str + "</UL> \n";
   output_str = output_str + "The nfsiostat run was started on " + system_info["date"] + " at \n";
   output_str = output_str + time_list[0] + " " + meridian_list[0] + ". </P>\n";
   f.write(output_str);
   
   # HTML hyperlinks
   output_str = "<P>Below are hyperlinks to various plots within the report \n";
   output_str = output_str + "for each filesystem. \n";
   output_str = output_str + "<BR><BR> \n";
   f.write(output_str);
   iloop = -1;
   plots_per_fs = 4;
   max_plots = plots_per_fs * len(fs_data_list);
   for item in fs_data_list:
      iloop = iloop + 1; 
      output_str = "<strong>" + item["fs"] + "</strong>: \n";
      junk1 = (iloop)*plots_per_fs+1;
      output_str = output_str + "<OL start=" + str(junk1) + "> \n";
      junk1 = "app_read_write" + str(iloop);
      output_str = output_str + "   <LI><a href=\"#" + junk1 + "\">Application Read and Write Throughput</a> \n";
      junk1 = "app_read_write_dir" + str(iloop);
      output_str = output_str + "   <LI><a href=\"#" + junk1 + "\">Application Read and Write Throughput with O_DIRECT</a> \n";
      junk1 = "app_read_write_svr" + str(iloop);
      output_str = output_str + "   <LI><a href=\"#" + junk1 + "\">Application Read and Write using NFS_READ and NFS_WRITE</a> \n";
      junk1 = "app_ops" + str(iloop);
      output_str = output_str + "   <LI><a href=\"#" + junk1 + "\">Application Operations/s, Read ops/s, and Write Ops/s</a> \n";
      output_str = output_str + "</OL> \n";
      output_str = output_str + "</P> \n";
      output_str = output_str + " \n";
      f.write(output_str);
   # end if
   
   
   iloop = -1;
   iplot = 0;
   for item in fs_data_list:
      iloop = iloop + 1;
      
      # Figure 1: read(2), write(2) vs. time (skip initial data point)
      # HTML report output (opt of section)
      iplot = iplot + 1;
      junk1 = "app_read_write" + str(iloop);
      output_str = "<H4>" + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + "</H4>\n";
      output_str = output_str + "<P>This figure plots the read and write throughput from applications \n";
      output_str = output_str + "using the read(2) and write(2) system call interfaces. You can find \n";
      output_str = output_str + "out more about this by simply typing \"man 2 read\" or \n";
      output_str = output_str + "\"man 2 write\". The throughput is plotted as a function of time. \n";
      f.write(output_str);
      # make the plot
      
      ylabel1 = "NFS Client Read \n Throughput (MB/s) \n by apps via read(2)";
      ylabel2 = "NFS Client Read \n Throughput (MB/s) \n by apps using \n NFS READ";
      ylabel3 = "Read Ops/s \n to Filesystem";
      ylabel4 = "Read Throughput \n (MB/s) on the \n NFS server";
      ylabel5 = "Total CPU Percentage \n Utilization";
      xlabel = "Time (seconds)";
      d1 = "NFS Client Read";
      d2 = "NFS Client Read NFS_READ";
      d3 = "Read Op/s";
      d4 = "NFS Server throughput";
      d5 = "Total CPU";
      filename = dirname + "/app_read_write" + str(iloop);
      #filename = "";
      #Plot2(x_seconds[1:], item["rMB_nor"][1:], x_seconds[1:], item["wMB_nor"][1:], 
      #      xlabel, ylabel1, ylabel2, d1, d2, filename);
      #Plot3(x_seconds[1:], item["rMB_nor"][1:], x_seconds[1:], item["wMB_nor"][1:], 
      #      iostat_x_seconds, iostat_time_sum_list, xlabel, ylabel1, ylabel2, ylabel3,
      #      d1, d2, d3, fsize, filename);
      Plot5(x_seconds[1:], item["rMB_nor"][1:], x_seconds[1:], item["rMB_svr"][1:], 
            x_seconds[1:], item["rops"][1:], iostat_x_seconds, iostat_device_data_list[iloop]["rMB"],
            iostat_x_seconds, iostat_time_sum_list,
            xlabel, ylabel1, ylabel2, ylabel3, ylabel4, ylabel5,
            d1, d2, d3, d4, d5, fsize, filename);
      # HTML Output: (Figure html)
      output_str = "<center> \n";
      junk1 = "app_read_write" + str(iloop) + ".png";
      output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
      output_str = output_str + "</P> \n \n";
      f.write(output_str);
      print "   Finished Plot ",iplot," of ",max_plots;
      
      sys.exit();
      
      # Figure 2: read, write vs. time using O_DIRECT (skip initial data point)
      # HTML report output (opt of section)
      iplot = iplot + 1;
      junk1 = "app_read_write_dir" + str(iloop);
      output_str = "<H4>" + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput with O_DIRECT</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + "</H4>\n";
      output_str = output_str + "<P>This figure plots the read and write throughput in MB/s by the \n";
      output_str = output_str + "applications that opened the file using the O_DIRECT flag.  \n";
      f.write(output_str);
      # make the plot
      
      ylabel1 = "Read Throughput (MB/s) \n by apps using O_DIRECT";
      ylabel2 = "Write Throughput (MB/s) \n by apps using O_DIRECT";
      xlabel = "Time (seconds)";
      d1 = "Read";
      d2 = "Write";
      filename = dirname + "/app_read_write_dir" + str(iloop);
      #filename = "";
      Plot2(x_seconds[1:], item["rMB_dir"][1:], x_seconds[1:], item["wMB_dir"][1:], 
            xlabel, ylabel1, ylabel2, d1, d2, fsize, filename);
      # HTML Output: (Figure html)
      output_str = "<center> \n";
      junk1 = "app_read_write_dir" + str(iloop) + ".png";
      output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput with O_DIRECT for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
      output_str = output_str + "</P> \n \n";
      f.write(output_str);
      print "   Finished Plot ",iplot," of ",max_plots;
      
      # Figure 3: read, write vs. time using NFS_READ and NFS_WRITE(skip initial data point)
      # HTML report output (opt of section)
      iplot = iplot + 1;
      junk1 = "app_read_write_svr" + str(iloop);
      output_str = "<H4>" + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write using NFS_READ and NFS_WRITE</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + "</H4>\n";
      output_str = output_str + "<P>This figure plots the read and write throughput in MB/s by the \n";
      output_str = output_str + "applications that did any read or writing to the NFS file system by any \n";
      output_str = output_str + "function. In general this means all IO from read (2), write (2), \n";
      output_str = output_str + "for any file either opened without O_DIRECT or with O_DIRECT. \n";
      f.write(output_str);
      # make the plot
      
      ylabel1 = "Read Throughput (MB/s) \n by apps using NFS READ";
      ylabel2 = "Write Throughput (MB/s) \n by apps using NFS WRITE";
      xlabel = "Time (seconds)";
      d1 = "NFS READ";
      d2 = "NFS WRITE";
      filename = dirname + "/app_read_write_svr" + str(iloop);
      #filename = "";
      Plot2(x_seconds[1:], item["rMB_svr"][1:], x_seconds[1:], item["wMB_svr"][1:], 
            xlabel, ylabel1, ylabel2, d1, d2, fsize, filename);
      # HTML Output: (Figure html)
      output_str = "<center> \n";
      junk1 = "app_read_write_svr" + str(iloop) + ".png";
      output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write throughput using NFS READ and NFS WRITE for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
      output_str = output_str + "</P> \n \n";
      f.write(output_str);
      print "   Finished Plot ",iplot," of ",max_plots;
      
      # Figure 4: ops, read ops, write ops vs. time using NFS_READ and NFS_WRITE(skip initial data point)
      # HTML report output (opt of section)
      iplot = iplot + 1;
      junk1 = "app_ops" + str(iloop);
      output_str = "<H4>" + str(iplot) + ". <a id=\"" + junk1 + "\">Application Operations/s, Read ops/s, and Write Ops/s</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + "</H4>\n";
      output_str = output_str + "<P>This figure plots the overall ops/s, read ops/ (Read IOPS), and \n";
      output_str = output_str + "write ops/s (Write IOPS).  \n";
      f.write(output_str);
      # make the plot
      
      ylabel1 = "Ops/s issued \n to Filesystem";
      ylabel2 = "Read Ops/s \n to Filesystem";
      ylabel3 = "Write Ops/s \n to Filesystem";
      xlabel = "Time (seconds)";
      d1 = "Ops/s";
      d2 = "Read Ops/s";
      d3 = "Write Ops/s";
      filename = dirname + "/app_ops" + str(iloop);
      #filename = "";
      Plot3(x_seconds[1:], item["ops"][1:], x_seconds[1:], item["rops"][1:], x_seconds[1:], item["wops"][1:], 
            xlabel, ylabel1, ylabel2, ylabel3, d1, d2, d3, fsize, filename);
      # HTML Output: (Figure html)
      output_str = "<center> \n";
      junk1 = "app_read_write_svr" + str(iloop) + ".png";
      output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Operations/s, Read ops/s, and Write ops/s for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
      output_str = output_str + "<BR><BR> \n";
      output_str = output_str + "</P> \n \n";
      f.write(output_str);
      print "   Finished Plot ",iplot," of ",max_plots;
   # end for
   
   # Start of Pickling
   # =================
   if (pickle_success > 0):
      # Open file for pickling
      pickle_file = open('nfsiostat_file.pickle', 'w')
      
      # Write list to pickle file
      pickle.dump(fs_data_list, pickle_file);
      
      # Close pickle file
      pickle_file.close();
   # end if
   print "Finished. Please open the document HTML/report.html in a browser.";
   
# end
