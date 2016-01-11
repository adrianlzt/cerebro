#!/usr/bin/python
#
# Enhanced data plotter for nfsiostat output. April 10, 2014
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
# [laytonjb ~]$ ./nfsiostat_plotter_v4.py nfsiostat.out
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
# If you want to get CPU usage information then you have to run iostat along
# with nfsiostat. Then you first process the iostat output using the
# iostat_plotter.py code which produces a Python Pickle file. The pickle
# is then used as input to nfsiostat_plotter_v4.py. If you don't do this
# you won't get CPU usage information (Note: this is because nfsiostat does
# not gather CPU usage).
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
except ImportError:
   time_var = 0;
   print "Cannot import time module - this is needed for this application.";
   print "Exiting..."
   sys.exit();

try:
   import matplotlib.pyplot as plt;   # Needed for plots
   matplotlib_var = 1
except ImportError:
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





# ------------------------------


def help_out():
   # prints out help information and stops
   print " ";
   print "This application creates a short HTML based report from nfsiostat";
   print "output (part of the sysstat tools). The report includes plots that";
   print "help analyze the output. This version relies on sysstat tools version";
   print "10.x. Many distributions such as CentOS or Red Hat use sysstat version";
   print "9.x. If this is the case, please upgrade your sysstat tools. This is ";
   print "not a difficult task but be sure you install over the previous version.";
   print " ";
   print "To run the application first gather the nfsiostat information using: ";
   print "the following example.";
   print " ";
   print "[laytonjb ~]$ nfsiostat -h -m -t 1 100 > nfsiostat.out ";
   print " ";
   print "where \"1 100\" tells nfsiostat to use \"1\" second intervals and ";
   print "\"100\" means to gather data for 100 internvals (or 100 seconds in this";
   print "case). The output from nfsiostat is send to a file which is ";
   print "\"nfsiostat.out\". You can name the file anything you want but be sure ";
   print "note the name of the file.";
   print " ";
   print "Then to run nfsiostat_plotter using the nfsiostat output file, the command is, ";
   print " ";
   print "[laytonjb ~]$ ./nfsiostat_plotter_v4.py nfsiostat.out ";
   print " ";
   print "where \"nfsiostat.out\" is the output from nfsiostat. The code is written ";
   print "in Python (obviously) and uses the shlex, time, os, and matplotlib ";
   print "modules. Be sure this libraries are installed on your system.";
   print " ";
   print "You can run nfsiostat_plotter in one of two ways. The first way creates ";
   print "the set of plots for each NFS file system mounted on the node. In this ";
   print "version of nfsiostat_plotter, four plots are created, so if you have ";
   print "two NFS mounts on the node, then you will ahve a total of eight plots.";
   print " ";
   print "The other way to run nfsiostat_plotter is to combine the results for each";
   print "NFS file system in the plots. This means you will have only four plots";
   print "in the HTML report even if you have more than one NFS mount. You run this ";
   print "with the following command:";
   print " ";
   print "[laytonjb ~]$ ./nfsiostat_plotter_v4.py -c nfsiostat.out ";
   print " ";
   print "The option \"-c\" tells nfsiostat_plotter to \"combine\" the NFS";
   print "mount point results into a single plot. Currently, you can analyze about";
   print "four NFS mount points. With more than four NFS mounts, the legend labels";
   print "run into each other.";
   print " ";
   print "When nfsiostat_plotter is done it will create a subdirectory \"HTML_REPORT\" ";
   print "that contains the plots and an html file \"report.html\". Open that ";
   print "html file in a browser or word processor and you will see the plots ";
   print "and a small write-up about them. Feel free to modify the code but ";
   print "please send back changes. ";
   print " ";
   print "Nfsiostat does not collect CPU usage. If you want to plot CPU usage along";
   print "with NFS usage, you nede to run \"iostat\" when you run \"nfsiostat\". ";
   print "Once \"iostat\" is done you process the data using \"iostat_plotter.py\". ";
   print "This code produces a pickle called \"iostat_file.pickle\". This is used by ";
   print "\"nfsiostat_plotter_v4.py\" as input. If the file exists then the plots ";
   print "will include CPU usage data. If it doesn't exist then the plots will not ";
   print "plot CPU usage, only NFS usage.";
   print " ";

# end def




def Three_Chart(x1, y1, x2, y2, x3, y3, xlabel, ylabel1, ylabel2, ylabel3, 
                d1, d2, d3, fsize, flegsize, filename, box_expansion):
   #
   # Creates 3 vertical subplots with legends and 1 x-axis label at the
   #   the bottom
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
   # fsize = font size for tick labels
   # flegsize = font size for legend labels
   # filename = name of file for plot output
   # box_expansion = expansion factor on legend box
   #
   
   # Top plot
   ax1 = plt.subplot(311);                 # Define top plot using subplot function
   plt.plot(x1,y1, "ro-", label=d1);       # Plot the first data set with a red line wiht "o" as a symbol
   plt.grid();
   plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
   plt.ylabel(ylabel1, fontsize=6);        # Use a 6 pt font for y-axis label
   ax1.set_xticklabels([]);                # get x-axis tick label
   
   # Legend
   box = ax1.get_position()
   ax1.set_position([box.x0, box.y0, box.width * box_expansion, box.height])  
   leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                     borderpad=0.15, handletextpad=0.2);
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");            # Make legend box have a gray background
   for t in leg1.get_texts():
      t.set_fontsize(flegsize);             # Change the font size of the legend text to 10 pt.
   # end for
   
   plt.xticks(fontsize=6);
   plt.yticks(fontsize=6);
   
   # Middle plot
   ax2 = plt.subplot(312);
   plt.plot(x2,y2, "bo-", label=d2);
   plt.grid();
   plt.xlabel(" ");
   plt.ylabel(ylabel2, fontsize=fsize);
   ax2.set_xticklabels([]);
   
   # Legend
   box = ax2.get_position();
   ax2.set_position([box.x0, box.y0, box.width * box_expansion, box.height]);
   leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                     borderpad=0.15, handletextpad=0.2);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(flegsize);
   # end for
   
   plt.xticks(fontsize=fsize);
   plt.yticks(fontsize=fsize);
   
   # Bottom plot
   ax3 = plt.subplot(313);
   plt.plot(x3,y3, "go-", label=d3);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel3, fontsize=fsize);
   
   # Legend
   box = ax3.get_position()
   ax3.set_position([box.x0, box.y0, box.width * box_expansion, box.height])
   leg3 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                     borderpad=0.15, handletextpad=0.2);
   frame3 = leg3.get_frame();
   frame3.set_facecolor("0.80");
   for t in leg3.get_texts():
      t.set_fontsize(flegsize);
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



def Two_Chart(x1, y1, x2, y2, xlabel, ylabel1, ylabel2, d1, d2, fsize, 
              flegsize, filename, box_expansion):
   #
   # Creates 2 vertical subplots with legends and 1 x-axis label at the
   #   the bottom
   #
   # x1 = x-axis data for top plot
   # x2 = x-axis data for bottom plot
   # y1 = y-axis data for top plot
   # y2 = y-axis data for bottom plot
   # xlabel = x-axis label (only on bottom plot)
   # ylabel1 = label for top y-axis
   # ylabel2 = label for middle y-axis
   # d1 = data label for top plot
   # d2 = data label for middle plot
   # fsize = font size for tick labels
   # flegsize = font size for legend labels
   # filename = name of file for plot output
   # box_expansion = expansion factor on legend box
   #
   
   # Top plot
   ax1 = plt.subplot(211);                 # Define top plot using subplot function
   plt.plot(x1,y1, "ro-", label=d1);       # Plot the first data set with a red line with "o" as a symbol
   plt.grid();
   plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
   plt.ylabel(ylabel1, fontsize=6);        # Use a 6 pt font for y-axis label
   ax1.set_xticklabels([]);                # get x-axis tick label
   
   # Legend
   box = ax1.get_position()
   ax1.set_position([box.x0, box.y0, box.width * box_expansion, box.height])  
   leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                     borderpad=0.15, handletextpad=0.2);
   frame1 = leg1.get_frame();
   frame1.set_facecolor("0.80");           # Make legend box have a gray background
   for t in leg1.get_texts():
      t.set_fontsize(flegsize);            # Change the font size of the legend text to flegsize
   # end for
   
   plt.xticks(fontsize=6);
   plt.yticks(fontsize=6);
   
   # Bottom plot
   ax2 = plt.subplot(212);
   plt.plot(x2,y2, "go-", label=d2);
   plt.grid();
   plt.xlabel(xlabel);
   plt.ylabel(ylabel2, fontsize=fsize);
   
   # Legend
   box = ax2.get_position()
   ax2.set_position([box.x0, box.y0, box.width * box_expansion, box.height])
   leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                     borderpad=0.15, handletextpad=0.2);
   frame2 = leg2.get_frame();
   frame2.set_facecolor("0.80");
   for t in leg2.get_texts():
      t.set_fontsize(flegsize);
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



def plot1(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
          time_sum_list, fsize, item, fs_data_list, line_list):
   #
   # Figure 1: read(2), write(2), total CPU vs. time (skip initial data point
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_read_write" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput, and Total CPU Utilization</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_read_write" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput, and Total CPU Utilization</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the read and write throughput from applications \n";
   output_str = output_str + "using the read(2) and write(2) system call interfaces as well as \n";
   output_str = output_str + "total CPU usage. You can find out more about write throughput by\n";
   output_str = output_str + "simply typing \"man 2 read\" or  \"man 2 write\". The throughput  \n";
   output_str = output_str + "is plotted as a function of time. \n";
   f.write(output_str);

   # make the plot
   ylabel1 = "NFS Client Read \n Throughput (MB/s) \n by apps via read(2)";
   ylabel2 = "NFS Client Write \n Throughput (MB/s) \n by apps via write(2)";
   ylabel3 = "Total CPU \n Percentage \n Utilization";
   xlabel = "Time (seconds)";
   #d1 = "NFS Client";
   d1 = "NFS Client Read";
   d2 = "NFS Client Write";
   d3 = "Total CPU Utilization";
   filename = dirname + "/app_read_write" + str(iloop);
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      
      # Compute box_expansion factor:
      box_expansion = 0.90;   # default
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;   # Curve fit of # chars vs. expansion box
      expansion_box = round(junk1,2);
      
      Three_Chart(x_seconds, item["rMB_nor"], x_seconds, item["wMB_nor"],
                  iostat_x_seconds, time_sum_list, xlabel, ylabel1, ylabel2, ylabel3,
                  d1, d2, d3, fsize, flegsize, filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;   # Curve fit of # chars vs. expansion box
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(311);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["rMB_nor"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(312);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["wMB_nor"], marker, label=d22);
         plt.xlabel(" ");
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
      # end for
      
      # Bottom plot
      ax3 = plt.subplot(313);
      plt.plot(iostat_x_seconds, time_sum_list, "go-", label=d3);
      plt.grid();
      plt.xlabel(xlabel);
      plt.ylabel(ylabel3, fontsize=fsize);
      
      # Legend
      box = ax3.get_position()
      ax3.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg3 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame3 = leg3.get_frame();
      frame3.set_facecolor("0.80");
      for t in leg3.get_texts():
         t.set_fontsize(flegsize);
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
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_read_write" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput, and Total CPU utilization for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput, and Total CPU utilization </strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
   
# end def




def plot1a(iloop, iplot, combined_plots, f, dirname, x_seconds,
           fsize, item, fs_data_list, line_list):
   #
   # Figure 1: read(2), write(2) (skip initial data point)
   #   This is when iostat data is not included
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_read_write" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_read_write" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the read and write throughput from applications \n";
   output_str = output_str + "using the read(2) and write(2) system call interfaces. You can  find\n";
   output_str = output_str + "out more about write throughput by simply typing \"man 2 read\"\n";
   output_str = output_str + "or  \"man 2 write\". The throughput is plotted as a function of time. \n";
   f.write(output_str);

   # make the plot
   ylabel1 = "NFS Client Read \n Throughput (MB/s) \n by apps via read(2)";
   ylabel2 = "NFS Client Write \n Throughput (MB/s) \n by apps via write(2)";
   xlabel = "Time (seconds)";
   d1 = "NFS Client Read";
   d2 = "NFS Client Write";
   filename = dirname + "/app_read_write" + str(iloop);
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      
      # Compute box_expansion factor:
      box_expansion = 0.90;   # default
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;   # Curve fit of # chars vs. expansion box
      expansion_box = round(junk1,2);
      
      Two_Chart(x_seconds, item["rMB_nor"], x_seconds, item["wMB_nor"], xlabel, ylabel1,
                ylabel2, d1, d2, fsize, flegsize, filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;   # Curve fit of # chars vs. expansion box
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(211);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["rMB_nor"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(212);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["wMB_nor"], marker, label=d22);
         plt.xlabel(xlabel);
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
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
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_read_write" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput </strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
   
# end def



def plot2(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
          time_sum_list, fsize, item, fs_data_list, line_list):
   #
   # Figure 2: read, write, total CPU vs. time (DIRECT IO)
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_read_write_dir" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput with O_DIRECT, and Total CPU Utilization</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_read_write_dir" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput with O_DIRECT, and Total CPU Utilization</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the read and write throughput in MB/s by the \n";
   output_str = output_str + "applications that opened the file using the O_DIRECT flag. It \n";
   output_str = output_str + "also plots the total CPU usage (user + system). The throughput  \n";
   output_str = output_str + "is plotted as a function of time. \n";
   f.write(output_str);
   
   # make the plot
   ylabel1 = "Read Throughput (MB/s) \n by apps using O_DIRECT";
   ylabel2 = "Write Throughput (MB/s) \n by apps using O_DIRECT";
   ylabel3 = "Total CPU \n Percentage \n Utilization";
   xlabel = "Time (seconds)";
   d1 = "NFS Client Read";
   d2 = "NFS Client Write";
   d3 = "Total CPU Utilization";
   filename = dirname + "/app_read_write_dir" + str(iloop);
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      box_expansion = 0.90; 
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      Three_Chart(x_seconds, item["rMB_dir"], x_seconds, item["wMB_dir"],
                  iostat_x_seconds, time_sum_list, xlabel, ylabel1, ylabel2, ylabel3,
                  d1, d2, d3, fsize, flegsize, filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(311);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["rMB_dir"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(312);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["wMB_dir"], marker, label=d22);
         plt.xlabel(" ");
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
      # end for
      
      # Bottom plot
      ax3 = plt.subplot(313);
      plt.plot(iostat_x_seconds, time_sum_list, "go-", label=d3);
      plt.grid();
      plt.xlabel(xlabel);
      plt.ylabel(ylabel3, fontsize=fsize);
      
      # Legend
      box = ax3.get_position()
      ax3.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg3 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame3 = leg3.get_frame();
      frame3.set_facecolor("0.80");
      for t in leg3.get_texts():
         t.set_fontsize(flegsize);
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
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_read_write_dir" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput with O_DIRECT, and Total CPU utilization for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput with O_DIRECT, and Total CPU utilization </strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
   
# end def




def plot2a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
           fs_data_list, line_list):
   #
   # Figure 2a: read, write vs. time (DIRECT IO)
   #   No iostat data
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_read_write_dir" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput with O_DIRECT</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_read_write_dir" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write Throughput with O_DIRECT</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the read and write throughput in MB/s by the \n";
   output_str = output_str + "applications that opened the file using the O_DIRECT flag. \n";
   output_str = output_str + "The throughput is plotted as a function of time. \n";
   f.write(output_str);
   
   # make the plot
   ylabel1 = "Read Throughput (MB/s) \n by apps using O_DIRECT";
   ylabel2 = "Write Throughput (MB/s) \n by apps using O_DIRECT";
   xlabel = "Time (seconds)";
   d1 = "NFS Client Read";
   d2 = "NFS Client Write";
   filename = dirname + "/app_read_write_dir" + str(iloop);
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      box_expansion = 0.90; 
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      Two_Chart(x_seconds, item["rMB_dir"], x_seconds, item["wMB_dir"],
                xlabel, ylabel1, ylabel2, d1, d2, fsize, flegsize,
                filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(211);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["rMB_dir"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(212);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["wMB_dir"], marker, label=d22);
         plt.xlabel(xlabel);
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
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
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_read_write_dir" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput with O_DIRECT for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write Throughput with O_DIRECT</strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
   
# end def






def plot3(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
          time_sum_list, fsize, item, fs_data_list, line_list):
   #
   # Figure 3: read, write, total CPU vs. time (NFS READ and NFS WRITE)
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_read_write_svr" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write using NFS_READ and NFS_WRITE, and Total CPU Utilization</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_read_write_svr" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write using NFS_READ and NFS_WRITE, and Total CPU Utilization</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the read and write throughput in MB/s by the \n";
   output_str = output_str + "applications that read from the server via an NFS READ request \n";
   output_str = output_str + "or written to server via an NFS WRITE request. It also plots \n";
   output_str = output_str + "the total CPU usage (user + system). The throughput  is plotted \n";
   output_str = output_str + "as a function of time. \n";
   f.write(output_str);
   
   # make the plot
   ylabel1 = "Read Throughput (MB/s) \n by apps using NFS READ";
   ylabel2 = "Write Throughput (MB/s) \n by apps using NFS WRITE";
   ylabel3 = "Total CPU \n Percentage \n Utilization";
   xlabel = "Time (seconds)";
   d1 = "NFS Client Read";
   d2 = "NFS Client Write";
   d3 = "Total CPU Utilization";
   filename = dirname + "/app_read_write_svr" + str(iloop);
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      box_expansion = 0.90;
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      Three_Chart(x_seconds, item["rMB_svr"], x_seconds, item["wMB_svr"],
                  iostat_x_seconds, time_sum_list, xlabel, ylabel1, ylabel2, ylabel3,
                  d1, d2, d3, fsize, flegsize, filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(311);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["rMB_svr"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(312);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["wMB_svr"], marker, label=d22);
         plt.xlabel(" ");
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
      # end for
      
      # Bottom plot
      ax3 = plt.subplot(313);
      plt.plot(iostat_x_seconds, time_sum_list, "go-", label=d3);
      plt.grid();
      plt.xlabel(xlabel);
      plt.ylabel(ylabel3, fontsize=fsize);
      
      # Legend
      box = ax3.get_position()
      ax3.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg3 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame3 = leg3.get_frame();
      frame3.set_facecolor("0.80");
      for t in leg3.get_texts():
         t.set_fontsize(flegsize);
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
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_read_write_svr" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write throughput using NFS READ and NFS WRITE, and Total CPU utilization for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write throughput using NFS READ and NFS WRITE, and Total CPU utilization </strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
# end def





def plot3a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
           fs_data_list, line_list):
   #
   # Figure 3a: read, write vs. time (NFS READ and NFS WRITE)
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_read_write_svr" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write using NFS_READ and NFS_WRITE</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_read_write_svr" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Read and Write using NFS_READ and NFS_WRITE</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the read and write throughput in MB/s by the \n";
   output_str = output_str + "applications that read from the server via an NFS READ request \n";
   output_str = output_str + "or written to server via an NFS WRITE request. The throughput is \n";
   output_str = output_str + "plotted as a function of time. \n";
   f.write(output_str);
   
   # make the plot
   ylabel1 = "Read Throughput (MB/s) \n by apps using NFS READ";
   ylabel2 = "Write Throughput (MB/s) \n by apps using NFS WRITE";
   xlabel = "Time (seconds)";
   d1 = "NFS Client Read";
   d2 = "NFS Client Write";
   filename = dirname + "/app_read_write_svr" + str(iloop);
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      box_expansion = 0.90;
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      Two_Chart(x_seconds, item["rMB_svr"], x_seconds, item["wMB_svr"], xlabel,
                ylabel1, ylabel2, d1, d2,  fsize, flegsize, filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(211);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["rMB_svr"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(212);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["wMB_svr"], marker, label=d22);
         plt.xlabel(xlabel);
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
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
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_read_write_svr" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write throughput using NFS READ and NFS WRITE for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Read and Write throughput using NFS READ and NFS WRITE</strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
# end def






def plot4(iloop, iplot, combined_plots, f, dirname, x_seconds, 
          fsize, item, fs_data_list, line_list):
   #
   # Figure 4: ops, read ops, write ops vs. time
   #
   if (combined_plots == 0):
      output_str = "<H4> \n"
      junk1 = "app_ops" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Operations/s, Read ops/s, and Write Ops/s</a>";
      output_str = output_str + ". Filesystem: " + item["fs"] + " \n";
      output_str = output_str + "</H4> \n";
   elif (combined_plots == 1):
      output_str = "<H3> \n"
      junk1 = "app_ops" + str(iloop);
      output_str = output_str + str(iplot) + ". <a id=\"" + junk1 + "\">Application Operations/s, Read ops/s, and Write Ops/s</a>";
      output_str = output_str + "</H3> \n";
   # end if
   
   output_str = output_str + " \n";
   output_str = output_str + "<P>This figure plots the overall ops/s, read ops/ (Read IOPS), and \n";
   output_str = output_str + "write ops/s (Write IOPS) versus time.  \n";
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
   fsize = 8;
   flegsize = 6;
   
   if (combined_plots == 0):
      box_expansion = 0.90;
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      # HTML Output: (Figure html)
      Three_Chart(x_seconds, item["ops"], x_seconds, item["rops"],
                  x_seconds, item["wops"], xlabel, ylabel1, ylabel2, ylabel3,
                  d1, d2, d3, fsize, flegsize, filename, box_expansion);
   elif (combined_plots == 1):
      jloop = -1;
      expansion_box = 0.88;   # default
      
      # Compute expansion_box factor:
      ilongest = 0;
      for item in fs_data_list:
         if (len(d1) > ilongest):
            ilongest = len(d1);
         # end if
         d11 = item["fs"] + ": \n ";
         if (len(d11) > ilongest):
            ilongest = len(d11);
         # end if
         if (len(d2) > ilongest):
            ilongest = len(d2);
         # end if
         d22 = item["fs"] + ": \n";
         if (len(d22) > ilongest):
            ilongest = len(d22);
         # end if
         if (len(d3) > ilongest):
            ilongest = len(d3);
         # end if
         d33 = item["fs"] + ": \n";
         if (len(d33) > ilongest):
            ilongest = len(d33);
         # end if
      # end for
      junk1 = -0.0082702674*ilongest + 1.0538027948;
      expansion_box = round(junk1,2);
      
      # Top plot:
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax1 = plt.subplot(311);                 # Define top plot using subplot function
         d11 = item["fs"] + ": \n" + d1;
         plt.plot(x_seconds, item["ops"], marker, label=d11);
         plt.xlabel(" ");                        # Don't put an x-axis label since it's the top plot
         plt.ylabel(ylabel1, fontsize=fsize);    # Use a 10 pt font for y-axis label
         ax1.set_xticklabels([]);                # get x-axis tick label
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend
      box = ax1.get_position()
      ax1.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg1 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame1 = leg1.get_frame();
      frame1.set_facecolor("0.80");           # Make legend box have a gray background
      for t in leg1.get_texts():
         t.set_fontsize(flegsize);               # Change the font size of the legend text to 10 pt.
      # end if
      
      # Middle Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax2 = plt.subplot(312);
         d22 = item["fs"] + ": \n" + d2;
         plt.plot(x_seconds, item["rops"], marker, label=d22);
         plt.xlabel(" ");
         plt.ylabel(ylabel2, fontsize=fsize);
         ax2.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax2.get_position()
      ax2.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg2 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame2 = leg2.get_frame();
      frame2.set_facecolor("0.80");
      for t in leg2.get_texts():
         t.set_fontsize(flegsize);
      # end for
      
      # Bottom Plot:
      jloop = -1;
      for item in fs_data_list:
         jloop = jloop + 1;
         
         marker = line_list[jloop];
         ax3 = plt.subplot(313);
         d33 = item["fs"] + ": \n" + d3;
         plt.plot(x_seconds, item["wops"], marker, label=d33);
         plt.xlabel(xlabel);
         plt.ylabel(ylabel3, fontsize=fsize);
         ax3.set_xticklabels([]);
         
         plt.xticks(fontsize=fsize);
         plt.yticks(fontsize=fsize);
      # end for
      plt.grid();
      # Legend:
      box = ax3.get_position()
      ax3.set_position([box.x0, box.y0, box.width * expansion_box, box.height])
      leg3 = plt.legend(bbox_to_anchor=(1.01, 1), loc=2, borderaxespad=0., labelspacing=0, 
                        borderpad=0.15, handletextpad=0.2);
      frame3 = leg3.get_frame();
      frame3.set_facecolor("0.80");
      for t in leg3.get_texts():
         t.set_fontsize(flegsize);
      # end for
      
      # Either save the plot to a file or display it to the screen
      if (len(filename) == 0):
         plt.show();
      else:
         plt.savefig(filename);
         plt.close();
      # end if
   # end if
      
   # HTML Output:
   output_str = "<center> \n";
   junk1 = "app_ops" + str(iloop) + ".png";
   output_str = output_str + "<img src=\"" + junk1 + "\"> \n";
   if (combined_plots == 0):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Operations/s, Read ops/s, and Write ops/s for FileSystem: " + item["fs"] + "</strong></center><BR><BR> \n";
   elif (combined_plots == 1):
      output_str = output_str + "<BR><BR><strong>Figure " + str(iplot) + " - App Operations/s, Read ops/s, and Write ops/s </strong></center><BR><BR> \n";
   # end if
   output_str = output_str + "<BR><BR> \n";
   output_str = output_str + "</P> \n \n";
   f.write(output_str);
   
# end def









# ===================
# Main Python section
# ===================

if __name__ == '__main__':
   
   # Get the command line inputs
   input_options = sys.argv;
   combined_plots = 0;
   help_flag = 0;
   for item in input_options:
      item2 = item.lower();
      if (item2 == "-c"):
         combined_plots = 1;
      elif ( (item2[0:2] == "-h") or (item2[0:2] == "-H") ):
         help_flag = 1;
      # end if
   # end for
   if (help_flag == 1):
      help_out();
      sys.exit();
   # end if
   
   input_filename = input_options[-1];
   
   print "nfsiostat plotting script (includes iostat data)";
   print " ";
   print "input filename: ",input_filename;
   
   # Look for pickle file:
   filename = "./iostat_file.pickle";
   pickle_success = 0;
   if os.path.isfile(filename):
      pickle_success = 1;
   # end if
   
   # Read iostat pickle:
   if (pickle_success > 0):
      print "Reading iostat_file.pickle";
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
      
      # "Total" CPU utilziation (user + system)
      time_sum_list = [];
      for i in range(0,len(iostat_user_list)):
          time_sum_list.append( (iostat_user_list[i] + iostat_system_list[i]) );
      # end for
      #print "iostat_device_data_list:",iostat_device_data_list;
      #print "iostat_device_data_list[iloop]:",iostat_device_data_list[1];
      #print "iostat_device_data_list[iloop]["r"]:",iostat_device_data_list[1]["r"];
      #print "total time: ",time_sum_list;
      
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
               if ( int(junk2[0]) < 12):
                  junk3 = int(junk2[0]) + 12;
               elif (int(junk2[0]) == 12):
                  junk3 = int(junk2[0]);
               # end if
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
   if (combined_plots == 0):
      output_str = output_str + "</UL> \n";
      output_str = output_str + "For each filesystem there are a series of plots of the output \n";
      output_str = output_str + "from nfsiostat that was captured. The report is contained in a\n";
      output_str = output_str + "subdirectory HTML_REPORT. In that directory you will find a \n";
      output_str = output_str + "file name report.html. Just open that file in a browser \n";
      output_str = output_str + "and you will see the plots. Please note that all plots are \n";
      output_str = output_str + "referenced to the beginning time of the nfsiostat run. </P>\n";
      output_str = output_str + " \n";
      f.write(output_str);
   elif(combined_plots == 1):
      output_str = output_str + "</UL> \n";
      output_str = output_str + "There are a series of plots from the captured nfsiostat output \n";
      output_str = output_str + "where all devices are plotted together where possible. \n";
      output_str = output_str + "The report is contained in a subdirectory HTML_REPORT.\n";
      output_str = output_str + "In that directory you will find a file name report.html. Just \n";
      output_str = output_str + "open that file in a browser and you will see the plots. \n";
      output_str = output_str + "Please note that all plots are referenced to the beginning \n";
      output_str = output_str + "time of the nfsiostat run. \n";
      output_str = output_str + "</P>\n";
      output_str = output_str + " \n";
      f.write(output_str);
   # end if
   
   
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
   output_str = output_str + time_list[0] + " " + meridian_list[0] + ". \n";
   output_str = output_str + "</P> \n";
   f.write(output_str);
   
   # HTML hyperlinks
   if (combined_plots == 0):
      output_str = "<P>Below are hyperlinks to various plots within the report \n";
      output_str = output_str + "for each device. \n";
      output_str = output_str + "<BR><BR> \n";
      f.write(output_str);
   elif (combined_plots == 1):
      output_str = "<P>Below are hyperlinks to various plots within the report \n";
      output_str = output_str + "where all of the devices are plotted together on each chart. \n";
      output_str = output_str + "<BR><BR> \n";
      f.write(output_str);
   # end if
   iloop = -1;
   plots_per_fs = 4;
   max_plots = plots_per_fs * len(fs_data_list);
   if (combined_plots == 0):
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
   elif (combined_plots == 1):
      iloop = 0;
      iloop = iloop + 1;
      output_str = "<OL start=" + str(iloop) + "> \n";
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
   
   
   # Create array of line colors/styles:
   # http://matplotlib.org/api/artist_api.html#matplotlib.lines.Line2D.lineStyles
   # line_style = ['-', '--', '-.'];
   # line_marker  = ['o', '^', 's', '*', '+', '<', '>', 'v'];
   color_list = ['b', 'g', 'r', 'c', 'm', 'y', 'k'];
   line_style = ['o-', '^--', 's-.', '*-', '<--', '>-.', 'v-', 'o--'];
   line_list = [];
   for line_type in line_style:
      for color in color_list:
         junk2 = color + line_type;
         line_list.append(junk2);
      # end for
   # end for
   
   
   
   # Actually create the plots!!
   if (combined_plots == 0):
      # Loop over each device and create plots and HTML:
      iloop = -1;
      iplot = 0;
      for item in fs_data_list:
         iloop = iloop + 1;
         
         print "File system: ",item["fs"];
         output_str = "<HR> \n";
         f.write(output_str);
         
         # Figure 1:
         if (pickle_success > 0):
            # Figure 1: read(2), write(2), total CPU vs. time
            fsize = 6;
            iplot = iplot + 1;
            plot1(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
                  iostat_time_sum_list, fsize, item, fs_data_list, line_list);
            print "   Finished Plot ",iplot," of ",max_plots;
         else:
            # Figure 1: read(2), write(2) vs. time
            fsize = 6;
            iplot = iplot + 1;
            plot1a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
                   fs_data_list, line_list);
            print "   Finished Plot ",iplot," of ",max_plots;
         # end if
         
         # Figure 2:
         if (pickle_success > 0):
            # Figure 2: read, write, total CPU vs. time using O_DIRECT
            fsize = 6;
            iplot = iplot + 1;
            plot2(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
                  iostat_time_sum_list, fsize, item, fs_data_list, line_list);
         else:
            # Figure 2: read, write vs. time using O_DIRECT
            fsize = 6;
            iplot = iplot + 1;
            plot2a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item, 
                   fs_data_list, line_list);
         # end if
         print "   Finished Plot ",iplot," of ",max_plots;
         
         # Figure 3:
         if (pickle_success > 0):
            # Figure 3: read, write, total CPU vs. time using O_DIRECT
            fsize = 6;
            iplot = iplot + 1;
            plot3(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
                  iostat_time_sum_list, fsize, item, fs_data_list, line_list);
         else:
            # Figure 3: read, write time using O_DIRECT
            fsize = 6;
            iplot = iplot + 1;
            plot3a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
                   fs_data_list, line_list);
         # end if
         print "   Finished Plot ",iplot," of ",max_plots;
         
         # Figure 4: ops, read ops, write ops vs. time
         fsize = 6;
         iplot = iplot + 1;
         plot4(iloop, iplot, combined_plots, f, dirname, x_seconds,
               fsize, item, fs_data_list, line_list);
         print "   Finished Plot ",iplot," of ",max_plots;
      # end for
   elif (combined_plots == 1):
      # For each plot, loop over each device and create plot and HTML:
      iloop = 1;
      iplot = 0;
       
      output_str = "<HR> \n";
      f.write(output_str);
      
      # Figure 1:
      if (pickle_success > 0):
         # Figure 1: read(2), write(2), total CPU vs. time
         fsize = 6;
         iplot = iplot + 1;
         plot1(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
               iostat_time_sum_list, fsize, item, fs_data_list, line_list);
      else:
         # Figure 1: read(2), write(2), total CPU vs. time
         fsize = 6;
         iplot = iplot + 1;
         plot1a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
                fs_data_list, line_list);
      print "   Finished Plot ",iplot," of ",max_plots;
      
      # Figure 2:
      if (pickle_success > 0):
         # Figure 2: read, write, total CPU vs. time using O_DIRECT
         fsize = 6;
         iplot = iplot + 1;
         plot2(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
               iostat_time_sum_list, fsize, item, fs_data_list, line_list);
      else:
         # Figure 2: read, write vs. time using O_DIRECT
         fsize = 6;
         iplot = iplot + 1;
         plot2a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
                fs_data_list, line_list);
      # end if
      print "   Finished Plot ",iplot," of ",max_plots;
      
      # Figure 3:
      if (pickle_success > 0):
         # Figure 3: read, write, total CPU vs. time using O_DIRECT
         fsize = 6;
         iplot = iplot + 1;
         plot3(iloop, iplot, combined_plots, f, dirname, x_seconds, iostat_x_seconds,
               iostat_time_sum_list, fsize, item, fs_data_list, line_list);
      else:
         # Figure 3: read, write vs. time using O_DIRECT
         fsize = 6;
         iplot = iplot + 1;
         plot3a(iloop, iplot, combined_plots, f, dirname, x_seconds, fsize, item,
                fs_data_list, line_list);
      # end if
      print "   Finished Plot ",iplot," of ",max_plots;
      
      # Figure 4: ops, read ops, write ops vs. time
      fsize = 6;
      iplot = iplot + 1;
      plot4(iloop, iplot, combined_plots, f, dirname, x_seconds,
            fsize, item, fs_data_list, line_list);
      print "   Finished Plot ",iplot," of ",max_plots;
   # end if
   
   
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
