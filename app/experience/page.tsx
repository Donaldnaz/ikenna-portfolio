"use client";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const experiences = [
	{
		title: "Cloud & AI Engineer",
		company: "Vosyn",
		period: "Jan 2025 - Present",
		description:
			"Architecting and deploying multi-cloud solutions (AWS, GCP, Azure) for AI-driven platforms, focusing on scalability and operational excellence.",
		highlights: [
			"Automated infrastructure provisioning using Terraform and CloudFormation, ensuring consistency across environments.",
			"Designed and implemented high-performance CI/CD pipelines, reducing deployment times by 75%.",
			"Re-architected legacy systems into modern cloud-managed services to optimize costs and performance.",
			"Deployed and scaled AI workloads using Vertex AI and custom microservice architectures.",
			"Configured comprehensive monitoring and observability stacks using CloudWatch and Cloud Monitoring.",
		],
	},
];

export default function Experience() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						Experience
					</h2>
					<p className="mt-4 text-zinc-400">
						My professional journey in cloud engineering and AI platform
						development.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="grid grid-cols-1 gap-8 mx-auto lg:mx-0">
					{experiences.map((exp) => (
						<Card key={exp.title + exp.period}>
							<div className="p-4 relative flex flex-col gap-4 duration-700 group md:gap-8 md:p-8">
								<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
									<h3 className="text-2xl font-bold text-zinc-100 group-hover:text-white font-display">
										{exp.title}
									</h3>
									<span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300">
										{exp.period}
									</span>
								</div>
								<h4 className="text-lg font-medium text-zinc-300">
									{exp.company}
								</h4>
								<p className="text-zinc-400">{exp.description}</p>
								<ul className="space-y-2">
									{exp.highlights.map((highlight, i) => (
										<li
											key={i}
											className="flex gap-2 text-sm text-zinc-400 group-hover:text-zinc-200"
										>
											<span className="text-zinc-600">•</span>
											<span>{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
