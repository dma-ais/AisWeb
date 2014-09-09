/* Copyright (c) 2011 Danish Maritime Authority.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package dk.dma.ais.web.app;

import java.io.File;
import java.lang.Thread.UncaughtExceptionHandler;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.ServerConnector;
import org.eclipse.jetty.webapp.Configuration.ClassList;
import org.eclipse.jetty.webapp.WebAppContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.beust.jcommander.Parameter;
import com.google.inject.Injector;

import dk.dma.commons.app.AbstractDaemon;

public class AisWebApp extends AbstractDaemon {

    static final Logger LOG = LoggerFactory.getLogger(AisWebApp.class);
    
    @Parameter(names = "-port", description = "The port to run AisWeb on")
    int port = 8080;

    @Override
    protected void runDaemon(Injector injector) throws Exception {
        final Server server = new Server(port);
        
        ClassList classlist = ClassList.setServerDefault(server);
        classlist.addAfter("org.eclipse.jetty.webapp.FragmentConfiguration", "org.eclipse.jetty.plus.webapp.EnvConfiguration", "org.eclipse.jetty.plus.webapp.PlusConfiguration");
        classlist.addBefore("org.eclipse.jetty.webapp.JettyWebXmlConfiguration", "org.eclipse.jetty.annotations.AnnotationConfiguration");
        
        ((ServerConnector) server.getConnectors()[0]).setReuseAddress(true);
        
        final File webappDir = new File(AisWebApp.class.getProtectionDomain().getCodeSource().getLocation().getFile());
        final WebAppContext webappContext = new WebAppContext(webappDir.getAbsolutePath(), "/");
        server.setHandler(webappContext);
        
        server.start();
        server.join();
    }

    public static void main(String[] args) throws Exception {
        Thread.setDefaultUncaughtExceptionHandler(new UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread t, Throwable e) {
                LOG.error("Uncaught exception in thread " + t.getClass().getCanonicalName() + ": " + e.getMessage(), e);
                System.exit(-1);
            }
        });
        new AisWebApp().execute(args);
    }

}
